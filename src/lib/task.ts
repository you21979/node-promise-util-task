type Resolver<T> = () => T

/**
 * It will always be executed in the order waiting for the result of Promise.
 * @param funcs An array of functions that return value, or promise.
 * @returns Results are stored in the order stored in funcs.
 */
export const seq = ( funcs : Resolver<any>[] ) : Promise<any[]> => {
    const results : any = []
    return funcs.reduce( (prevPromise : Promise<any>, func : Resolver<any>) => {
        return prevPromise.then( () => {
            return Promise.resolve( func() ).then( (value : any) => {
                results.push(value)
            })
        })
    }, Promise.resolve() ).then( () => results )
}

/**
 * Execute processing at once.
 * @param funcs An array of functions that return value, or promise.
 * @returns Results are stored in the order stored in funcs.
 */
export const all = ( funcs : Resolver<any>[] ) : Promise<any[]> => {
    const promises : Promise<any>[] = funcs.map((func : Resolver<any>) => {
        try {
            return Promise.resolve( func() )
        } catch (e) {
            return Promise.reject(e)
        }
    })
    return Promise.all( promises )
}

/**
 * Execute the specified number of processes at once.
 * @param funcs An array of functions that return value, or promise.
 * @param max Maximum number of simultaneous executions.
 * @returns Results are stored in the order stored in funcs.
 */
export const limit = (funcs : Resolver<any>[], max : number = 1) : Promise<any[]> => {
    return all(limit_preprocess(funcs, max)).
        then(limit_postprocess)
}

export default limit

const limit_preprocess = (funcs : Resolver<any>[], max : number) : Resolver<any>[] => {
    const pipeline : Resolver<any>[][] = []
    for(let i = 0; i < max; ++i){
        pipeline[i] = []
    }
    funcs.forEach((func : Resolver<any>, n : number) => {
        const idx = n % max
        pipeline[idx].push(func)
    })
    return pipeline.map((funcs : Resolver<any>[]) => {
        return () => seq(funcs)
    })
}

const limit_postprocess = (matrix : any[][]) : any[] => {
    const max = matrix.reduce((sum, line) => { return sum + line.length }, 0)
    const results : any[] = new Array(max)
    const len = matrix.length
    for(let i = 0; i < len; ++i){
        const lenj = matrix[i].length
        for(let j = 0; j < lenj; ++j){
            results[i + (j * len)] = matrix[i][j]
        }
    }
    return results
}

