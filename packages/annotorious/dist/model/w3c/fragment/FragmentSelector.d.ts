import { Rectangle, RectangleGeometry } from '../../core';

export interface FragmentSelector {
    type: 'FragmentSelector';
    conformsTo: 'http://www.w3.org/TR/media-frags/';
    value: string;
}
export declare const parseFragmentSelector: (fragmentOrSelector: FragmentSelector | string, invertY?: boolean) => Rectangle;
export declare const serializeFragmentSelector: (geometry: RectangleGeometry) => FragmentSelector;
//# sourceMappingURL=FragmentSelector.d.ts.map