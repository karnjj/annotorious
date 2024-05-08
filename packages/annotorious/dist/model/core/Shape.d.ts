import { AbstractSelector } from '@annotorious/core';

export interface Shape extends AbstractSelector {
    type: ShapeType;
    geometry: Geometry;
}
export declare enum ShapeType {
    ELLIPSE = "ELLIPSE",
    POLYGON = "POLYGON",
    RECTANGLE = "RECTANGLE"
}
export interface Geometry {
    bounds: Bounds;
}
export interface Bounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
//# sourceMappingURL=Shape.d.ts.map