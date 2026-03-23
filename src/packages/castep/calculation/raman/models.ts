/**
 * 拉曼光谱计算的入参
 */
export interface RamanParams {
    /**拉曼强度数据 */
    raman: string[];
    /**拉曼活性标记 */
    ramanActive: boolean[];
}

/**
 * 拉曼光谱计算的返回结果
 */
export type RamanReturn = Array<{
    /**频率索引 */
    index: number;
    /**拉曼强度值 */
    intensity: string;
    /**是否具有拉曼活性 */
    active: boolean;
    /**标准化强度（0-100） */
    normalizedIntensity: string;
}>;

/**
 * 拉曼光谱最小粒度实现函数入参
 */
export interface RamanMinimizationImplParamsType {
    /**
     * 拉曼强度数据
     */
    raman: string[];
    /**
     * 拉曼活性标记
     */
    ramanActive: boolean[];
}
