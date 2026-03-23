/**
 * 红外光谱计算的入参
 */
export interface IRParams {
    /**红外强度数据 */
    ir: string[];
    /**红外活性标记 */
    irActive: boolean[];
}

/**
 * 红外光谱计算的返回结果
 */
export type IRReturn = Array<{
    /**频率索引 */
    index: number;
    /**红外强度值 */
    intensity: string;
    /**是否具有红外活性 */
    active: boolean;
    /**标准化强度（0-100） */
    normalizedIntensity: string;
}>;

/**
 * 红外光谱最小粒度实现函数入参
 */
export interface IRMinimizationImplParamsType {
    /**
     * 红外强度数据
     */
    ir: string[];
    /**
     * 红外活性标记
     */
    irActive: boolean[];
}
