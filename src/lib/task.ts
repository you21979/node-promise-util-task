type Resolver<T> = () => T

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

const createPipeline = (funcs : Resolver<any>[], max : number) : Resolver<any>[] => {
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

export const limit = (funcs : Resolver<any>[], max : number) : Promise<any[]> => {
    const pipeline_seqs = createPipeline(funcs, max)
    return all(pipeline_seqs).then((matrix : any[][]) => {
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
    })
}

