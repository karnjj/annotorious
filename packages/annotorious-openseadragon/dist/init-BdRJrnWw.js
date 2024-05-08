import { E as w, U as Ft, T as be, N as ee, j as H, L as He, c as Ge, w as Y, k as U, P as Pt, s as Le, J as R, K as W, b as te, B as $, D as O, a as Oe, O as Se, Q as we, V as De, H as G, W as Mt, R as q, X as kt, Y as A, p as P, Z as Rt, _ as At, $ as re, a0 as Wt, M as ye, a1 as Ut, a2 as oe, n as Te, e as M, a3 as zt } from "./index-B7tf-B_-.js";
import { U as X, T as I, R as le, S as Ee, i as he, b as $e, c as Ke, j as Ve, e as It, r as Ye, o as Ht, n as Xe, a as Gt, g as Lt, k as Ot, m as Dt, B as je } from "./colorToUniform-B7LFXjB6.js";
import { C as D } from "./CanvasPool-DnQQO9Ca.js";
import { b as Et } from "./batchSamplersUniformGroup-DVE1LRMO.js";
class Ne {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    Object.defineProperty(
      this,
      "resizeTo",
      /**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof app.Application#
       */
      {
        set(t) {
          globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = t, t && (globalThis.addEventListener("resize", this.queueResize), this.resize());
        },
        get() {
          return this._resizeTo;
        }
      }
    ), this.queueResize = () => {
      this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
    }, this._cancelResize = () => {
      this._resizeId && (cancelAnimationFrame(this._resizeId), this._resizeId = null);
    }, this.resize = () => {
      if (!this._resizeTo)
        return;
      this._cancelResize();
      let t, r;
      if (this._resizeTo === globalThis.window)
        t = globalThis.innerWidth, r = globalThis.innerHeight;
      else {
        const { clientWidth: i, clientHeight: n } = this._resizeTo;
        t = i, r = n;
      }
      this.renderer.resize(t, r), this.render();
    }, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
  }
  /**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
  }
}
Ne.extension = w.Application;
class qe {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    e = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, e), Object.defineProperty(
      this,
      "ticker",
      {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, Ft.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = e.sharedTicker ? be.shared : new be(), e.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const e = this._ticker;
      this.ticker = null, e.destroy();
    }
  }
}
qe.extension = w.Application;
class Je {
  constructor(e) {
    this._renderer = e;
  }
  push(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      canBundle: !1,
      action: "pushFilter",
      container: t,
      filterEffect: e
    });
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: !1
    });
  }
  execute(e) {
    e.action === "pushFilter" ? this._renderer.filter.push(e) : e.action === "popFilter" && this._renderer.filter.pop();
  }
  destroy() {
    this._renderer = null;
  }
}
Je.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "filter"
};
const $t = new H();
function Kt(s, e) {
  return e.clear(), Qe(s, e), e.isValid || e.set(0, 0, 0, 0), s.isRenderGroupRoot ? e.applyMatrix(s.renderGroup.localTransform) : e.applyMatrix(s.renderGroup.worldTransform), e;
}
function Qe(s, e) {
  if (s.localDisplayStatus !== 7 || !s.measurable)
    return;
  const t = !!s.effects.length;
  let r = e;
  if ((s.isRenderGroupRoot || t) && (r = ee.get().clear()), s.boundsArea)
    e.addRect(s.boundsArea, s.worldTransform);
  else {
    if (s.renderPipeId) {
      const n = s.bounds;
      r.addFrame(
        n.minX,
        n.minY,
        n.maxX,
        n.maxY,
        s.groupTransform
      );
    }
    const i = s.children;
    for (let n = 0; n < i.length; n++)
      Qe(i[n], r);
  }
  if (t) {
    let i = !1;
    for (let n = 0; n < s.effects.length; n++)
      s.effects[n].addBounds && (i || (i = !0, r.applyMatrix(s.renderGroup.worldTransform)), s.effects[n].addBounds(r, !0));
    i && (r.applyMatrix(s.renderGroup.worldTransform.copyTo($t).invert()), e.addBounds(r, s.relativeGroupTransform)), e.addBounds(r), ee.return(r);
  } else
    s.isRenderGroupRoot && (e.addBounds(r, s.relativeGroupTransform), ee.return(r));
}
function Vt(s, e) {
  e.clear();
  const t = e.matrix;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    i.globalDisplayStatus < 7 || (e.matrix = i.worldTransform, i.addBounds(e));
  }
  return e.matrix = t, e;
}
const Yt = new He({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      location: 0,
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class Ze {
  constructor(e) {
    this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new X({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    }), this._globalFilterBindGroup = new Ge({}), this.renderer = e;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    var e;
    return (e = this._activeFilterData) == null ? void 0 : e.backTexture;
  }
  push(e) {
    var f;
    const t = this.renderer, r = e.filterEffect.filters;
    this._filterStack[this._filterStackIndex] || (this._filterStack[this._filterStackIndex] = this._getFilterData());
    const i = this._filterStack[this._filterStackIndex];
    if (this._filterStackIndex++, r.length === 0) {
      i.skip = !0;
      return;
    }
    const n = i.bounds;
    e.renderables ? Vt(e.renderables, n) : e.filterEffect.filterArea ? (n.clear(), n.addRect(e.filterEffect.filterArea), n.applyMatrix(e.container.worldTransform)) : Kt(e.container, n);
    const a = t.renderTarget.rootRenderTarget.colorTexture.source;
    let o = a._resolution, c = 0, h = a.antialias, l = !1, d = !1;
    for (let p = 0; p < r.length; p++) {
      const m = r[p];
      if (o = Math.min(o, m.resolution), c += m.padding, m.antialias !== "inherit" && (m.antialias === "on" ? h = !0 : h = !1), !!!(m.compatibleRenderers & t.type)) {
        d = !1;
        break;
      }
      if (m.blendRequired && !(((f = t.backBuffer) == null ? void 0 : f.useBackBuffer) ?? !0)) {
        Y("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), d = !1;
        break;
      }
      d = m.enabled || d, l = l || m.blendRequired;
    }
    if (!d) {
      i.skip = !0;
      return;
    }
    const u = t.renderTarget.rootViewPort;
    if (n.scale(o).fitBounds(0, u.width, 0, u.height).scale(1 / o).pad(c).ceil(), !n.isPositive) {
      i.skip = !0;
      return;
    }
    i.skip = !1, i.bounds = n, i.blendRequired = l, i.container = e.container, i.filterEffect = e.filterEffect, i.previousRenderSurface = t.renderTarget.renderSurface, i.inputTexture = I.getOptimalTexture(
      n.width,
      n.height,
      o,
      h
    ), t.renderTarget.bind(i.inputTexture, !0), t.globalUniforms.push({
      offset: n
    });
  }
  pop() {
    const e = this.renderer;
    this._filterStackIndex--;
    const t = this._filterStack[this._filterStackIndex];
    if (t.skip)
      return;
    this._activeFilterData = t;
    const r = t.inputTexture, i = t.bounds;
    let n = U.EMPTY;
    if (e.renderTarget.finishRenderPass(), t.blendRequired) {
      const o = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null, c = e.renderTarget.getRenderTarget(t.previousRenderSurface);
      n = this.getBackTexture(c, i, o);
    }
    t.backTexture = n;
    const a = t.filterEffect.filters;
    if (this._globalFilterBindGroup.setResource(r.source.style, 2), this._globalFilterBindGroup.setResource(n.source, 3), e.globalUniforms.pop(), a.length === 1)
      a[0].apply(this, r, t.previousRenderSurface, !1), I.returnTexture(r);
    else {
      let o = t.inputTexture, c = I.getOptimalTexture(
        i.width,
        i.height,
        o.source._resolution,
        !1
      ), h = 0;
      for (h = 0; h < a.length - 1; ++h) {
        a[h].apply(this, o, c, !0);
        const d = o;
        o = c, c = d;
      }
      a[h].apply(this, o, t.previousRenderSurface, !1), I.returnTexture(o), I.returnTexture(c);
    }
    t.blendRequired && I.returnTexture(n);
  }
  getBackTexture(e, t, r) {
    const i = e.colorTexture.source._resolution, n = I.getOptimalTexture(
      t.width,
      t.height,
      i,
      !1
    );
    let a = t.minX, o = t.minY;
    r && (a -= r.minX, o -= r.minY), a = Math.floor(a * i), o = Math.floor(o * i);
    const c = Math.ceil(t.width * i), h = Math.ceil(t.height * i);
    return this.renderer.renderTarget.copyToTexture(
      e,
      n,
      { x: a, y: o },
      { width: c, height: h },
      { x: 0, y: 0 }
    ), n;
  }
  applyFilter(e, t, r, i) {
    const n = this.renderer, a = this._filterStack[this._filterStackIndex], o = a.bounds, c = Pt.shared, l = a.previousRenderSurface === r;
    let d = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution, u = this._filterStackIndex - 1;
    for (; u > 0 && this._filterStack[u].skip; )
      --u;
    u > 0 && (d = this._filterStack[u].inputTexture.source._resolution);
    const f = this._filterGlobalUniforms, p = f.uniforms, m = p.uOutputFrame, x = p.uInputSize, _ = p.uInputPixel, b = p.uInputClamp, S = p.uGlobalFrame, y = p.uOutputTexture;
    if (l) {
      let v = this._filterStackIndex;
      for (; v > 0; ) {
        v--;
        const C = this._filterStack[this._filterStackIndex - 1];
        if (!C.skip) {
          c.x = C.bounds.minX, c.y = C.bounds.minY;
          break;
        }
      }
      m[0] = o.minX - c.x, m[1] = o.minY - c.y;
    } else
      m[0] = 0, m[1] = 0;
    m[2] = t.frame.width, m[3] = t.frame.height, x[0] = t.source.width, x[1] = t.source.height, x[2] = 1 / x[0], x[3] = 1 / x[1], _[0] = t.source.pixelWidth, _[1] = t.source.pixelHeight, _[2] = 1 / _[0], _[3] = 1 / _[1], b[0] = 0.5 * _[2], b[1] = 0.5 * _[3], b[2] = t.frame.width * x[2] - 0.5 * _[2], b[3] = t.frame.height * x[3] - 0.5 * _[3];
    const T = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    S[0] = c.x * d, S[1] = c.y * d, S[2] = T.source.width * d, S[3] = T.source.height * d;
    const B = this.renderer.renderTarget.getRenderTarget(r);
    if (n.renderTarget.bind(r, !!i), r instanceof U ? (y[0] = r.frame.width, y[1] = r.frame.height) : (y[0] = B.width, y[1] = B.height), y[2] = B.isRoot ? -1 : 1, f.update(), n.renderPipes.uniformBatch) {
      const v = n.renderPipes.uniformBatch.getUboResource(f);
      this._globalFilterBindGroup.setResource(v, 0);
    } else
      this._globalFilterBindGroup.setResource(f, 0);
    this._globalFilterBindGroup.setResource(t.source, 1), this._globalFilterBindGroup.setResource(t.source.style, 2), e.groups[0] = this._globalFilterBindGroup, n.encoder.draw({
      geometry: Yt,
      shader: e,
      state: e._state,
      topology: "triangle-list"
    }), n.type === le.WEBGL && n.renderTarget.finishRenderPass();
  }
  _getFilterData() {
    return {
      skip: !1,
      inputTexture: null,
      bounds: new Le(),
      container: null,
      filterEffect: null,
      blendRequired: !1,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(e, t) {
    const r = this._activeFilterData, i = e.set(
      r.inputTexture._source.width,
      0,
      0,
      r.inputTexture._source.height,
      r.bounds.minX,
      r.bounds.minY
    ), n = t.worldTransform.copyTo(H.shared);
    return n.invert(), i.prepend(n), i.scale(
      1 / t.texture.frame.width,
      1 / t.texture.frame.height
    ), i.translate(t.anchor.x, t.anchor.y), i;
  }
}
Ze.extension = {
  type: [
    w.WebGLSystem,
    w.WebGPUSystem
  ],
  name: "filter"
};
const et = class tt extends He {
  constructor(...e) {
    let t = e[0] ?? {};
    t instanceof Float32Array && (R(W, "use new MeshGeometry({ positions, uvs, indices }) instead"), t = {
      positions: t,
      uvs: e[1],
      indices: e[2]
    }), t = { ...tt.defaultOptions, ...t };
    const r = t.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), i = t.uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), n = t.indices || new Uint32Array([0, 1, 2, 0, 2, 3]), a = t.shrinkBuffersToFit, o = new te({
      data: r,
      label: "attribute-mesh-positions",
      shrinkToFit: a,
      usage: $.VERTEX | $.COPY_DST
    }), c = new te({
      data: i,
      label: "attribute-mesh-uvs",
      shrinkToFit: a,
      usage: $.VERTEX | $.COPY_DST
    }), h = new te({
      data: n,
      label: "index-mesh-buffer",
      shrinkToFit: a,
      usage: $.INDEX | $.COPY_DST
    });
    super({
      attributes: {
        aPosition: {
          buffer: o,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        },
        aUV: {
          buffer: c,
          format: "float32x2",
          stride: 2 * 4,
          offset: 0
        }
      },
      indexBuffer: h,
      topology: t.topology
    }), this.batchMode = "auto";
  }
  /** The positions of the mesh. */
  get positions() {
    return this.attributes.aPosition.buffer.data;
  }
  set positions(e) {
    this.attributes.aPosition.buffer.data = e;
  }
  /** The UVs of the mesh. */
  get uvs() {
    return this.attributes.aUV.buffer.data;
  }
  set uvs(e) {
    this.attributes.aUV.buffer.data = e;
  }
  /** The indices of the mesh. */
  get indices() {
    return this.indexBuffer.data;
  }
  set indices(e) {
    this.indexBuffer.data = e;
  }
};
et.defaultOptions = {
  topology: "triangle-list",
  shrinkBuffersToFit: !1
};
let de = et;
const Xt = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function J(s) {
  const e = typeof s.fontSize == "number" ? `${s.fontSize}px` : s.fontSize;
  let t = s.fontFamily;
  Array.isArray(s.fontFamily) || (t = s.fontFamily.split(","));
  for (let r = t.length - 1; r >= 0; r--) {
    let i = t[r].trim();
    !/([\"\'])[^\'\"]+\1/.test(i) && !Xt.includes(i) && (i = `"${i}"`), t[r] = i;
  }
  return `${s.fontStyle} ${s.fontVariant} ${s.fontWeight} ${e} ${t.join(",")}`;
}
const ie = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, z = class g {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let e = g._experimentalLetterSpacingSupported;
    if (e !== void 0) {
      const t = O.get().getCanvasRenderingContext2D().prototype;
      e = g._experimentalLetterSpacingSupported = "letterSpacing" in t || "textLetterSpacing" in t;
    }
    return e;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(e, t, r, i, n, a, o, c, h) {
    this.text = e, this.style = t, this.width = r, this.height = i, this.lines = n, this.lineWidths = a, this.lineHeight = o, this.maxLineWidth = c, this.fontProperties = h;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(e = " ", t, r = g._canvas, i = t.wordWrap) {
    var b;
    const n = `${e}:${t.styleKey}`;
    if (g._measurementCache[n])
      return g._measurementCache[n];
    const a = J(t), o = g.measureFont(a);
    o.fontSize === 0 && (o.fontSize = t.fontSize, o.ascent = t.fontSize);
    const c = g.__context;
    c.font = a;
    const l = (i ? g._wordWrap(e, t, r) : e).split(/(?:\r\n|\r|\n)/), d = new Array(l.length);
    let u = 0;
    for (let S = 0; S < l.length; S++) {
      const y = g._measureText(l[S], t.letterSpacing, c);
      d[S] = y, u = Math.max(u, y);
    }
    const f = ((b = t._stroke) == null ? void 0 : b.width) || 0;
    let p = u + f;
    t.dropShadow && (p += t.dropShadow.distance);
    const m = t.lineHeight || o.fontSize + f;
    let x = Math.max(m, o.fontSize + f * 2) + (l.length - 1) * (m + t.leading);
    return t.dropShadow && (x += t.dropShadow.distance), new g(
      e,
      t,
      p,
      x,
      l,
      d,
      m + t.leading,
      u,
      o
    );
  }
  static _measureText(e, t, r) {
    let i = !1;
    g.experimentalLetterSpacingSupported && (g.experimentalLetterSpacing ? (r.letterSpacing = `${t}px`, r.textLetterSpacing = `${t}px`, i = !0) : (r.letterSpacing = "0px", r.textLetterSpacing = "0px"));
    let n = r.measureText(e).width;
    return n > 0 && (i ? n -= t : n += (g.graphemeSegmenter(e).length - 1) * t), n;
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(e, t, r = g._canvas) {
    const i = r.getContext("2d", ie);
    let n = 0, a = "", o = "";
    const c = /* @__PURE__ */ Object.create(null), { letterSpacing: h, whiteSpace: l } = t, d = g._collapseSpaces(l), u = g._collapseNewlines(l);
    let f = !d;
    const p = t.wordWrapWidth + h, m = g._tokenize(e);
    for (let x = 0; x < m.length; x++) {
      let _ = m[x];
      if (g._isNewline(_)) {
        if (!u) {
          o += g._addLine(a), f = !d, a = "", n = 0;
          continue;
        }
        _ = " ";
      }
      if (d) {
        const S = g.isBreakingSpace(_), y = g.isBreakingSpace(a[a.length - 1]);
        if (S && y)
          continue;
      }
      const b = g._getFromCache(_, h, c, i);
      if (b > p)
        if (a !== "" && (o += g._addLine(a), a = "", n = 0), g.canBreakWords(_, t.breakWords)) {
          const S = g.wordWrapSplit(_);
          for (let y = 0; y < S.length; y++) {
            let T = S[y], B = T, v = 1;
            for (; S[y + v]; ) {
              const k = S[y + v];
              if (!g.canBreakChars(B, k, _, y, t.breakWords))
                T += k;
              else
                break;
              B = k, v++;
            }
            y += v - 1;
            const C = g._getFromCache(T, h, c, i);
            C + n > p && (o += g._addLine(a), f = !1, a = "", n = 0), a += T, n += C;
          }
        } else {
          a.length > 0 && (o += g._addLine(a), a = "", n = 0);
          const S = x === m.length - 1;
          o += g._addLine(_, !S), f = !1, a = "", n = 0;
        }
      else
        b + n > p && (f = !1, o += g._addLine(a), a = "", n = 0), (a.length > 0 || !g.isBreakingSpace(_) || f) && (a += _, n += b);
    }
    return o += g._addLine(a, !1), o;
  }
  /**
   * Convienience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static _addLine(e, t = !0) {
    return e = g._trimRight(e), e = t ? `${e}
` : e, e;
  }
  /**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */
  static _getFromCache(e, t, r, i) {
    let n = r[e];
    return typeof n != "number" && (n = g._measureText(e, t, i) + t, r[e] = n), n;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static _collapseSpaces(e) {
    return e === "normal" || e === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static _collapseNewlines(e) {
    return e === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static _trimRight(e) {
    if (typeof e != "string")
      return "";
    for (let t = e.length - 1; t >= 0; t--) {
      const r = e[t];
      if (!g.isBreakingSpace(r))
        break;
      e = e.slice(0, -1);
    }
    return e;
  }
  /**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */
  static _isNewline(e) {
    return typeof e != "string" ? !1 : g._newlines.includes(e.charCodeAt(0));
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(e, t) {
    return typeof e != "string" ? !1 : g._breakingSpaces.includes(e.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static _tokenize(e) {
    const t = [];
    let r = "";
    if (typeof e != "string")
      return t;
    for (let i = 0; i < e.length; i++) {
      const n = e[i], a = e[i + 1];
      if (g.isBreakingSpace(n, a) || g._isNewline(n)) {
        r !== "" && (t.push(r), r = ""), t.push(n);
        continue;
      }
      r += n;
    }
    return r !== "" && t.push(r), t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(e, t) {
    return t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(e, t, r, i, n) {
    return !0;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(e) {
    return g.graphemeSegmenter(e);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(e) {
    if (g._fonts[e])
      return g._fonts[e];
    const t = g._context;
    t.font = e;
    const r = t.measureText(g.METRICS_STRING + g.BASELINE_SYMBOL), i = {
      ascent: r.actualBoundingBoxAscent,
      descent: r.actualBoundingBoxDescent,
      fontSize: r.actualBoundingBoxAscent + r.actualBoundingBoxDescent
    };
    return g._fonts[e] = i, i;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(e = "") {
    e ? delete g._fonts[e] : g._fonts = {};
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!g.__canvas) {
      let e;
      try {
        const t = new OffscreenCanvas(0, 0), r = t.getContext("2d", ie);
        if (r != null && r.measureText)
          return g.__canvas = t, t;
        e = O.get().createCanvas();
      } catch {
        e = O.get().createCanvas();
      }
      e.width = e.height = 10, g.__canvas = e;
    }
    return g.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    return g.__context || (g.__context = g._canvas.getContext("2d", ie)), g.__context;
  }
};
z.METRICS_STRING = "|ÉqÅ";
z.BASELINE_SYMBOL = "M";
z.BASELINE_MULTIPLIER = 1.4;
z.HEIGHT_MULTIPLIER = 2;
z.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const s = new Intl.Segmenter();
    return (e) => [...s.segment(e)].map((t) => t.segment);
  }
  return (s) => [...s];
})();
z.experimentalLetterSpacing = !1;
z._fonts = {};
z._newlines = [
  10,
  // line feed
  13
  // carriage return
];
z._breakingSpaces = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
];
z._measurementCache = {};
let L = z;
const ve = [
  "_fontFamily",
  "_fontStyle",
  "_fontSize",
  "_fontVariant",
  "_fontWeight",
  "_breakWords",
  "_align",
  "_leading",
  "_letterSpacing",
  "_lineHeight",
  "_textBaseline",
  "_whiteSpace",
  "_wordWrap",
  "_wordWrapWidth",
  "_padding",
  "_cssOverrides",
  "_trim"
];
function rt(s) {
  const e = [];
  let t = 0;
  for (let r = 0; r < ve.length; r++) {
    const i = ve[r];
    e[t++] = s[i];
  }
  return t = it(s._fill, e, t), t = jt(s._stroke, e, t), e.join("-");
}
function it(s, e, t) {
  var r;
  return s && (e[t++] = s.color, e[t++] = s.alpha, e[t++] = (r = s.fill) == null ? void 0 : r.uid), t;
}
function jt(s, e, t) {
  return s && (t = it(s, e, t), e[t++] = s.width, e[t++] = s.alignment, e[t++] = s.cap, e[t++] = s.join, e[t++] = s.miterLimit), t;
}
const ue = class K extends Oe {
  constructor(e = {}) {
    super(), Nt(e);
    const t = { ...K.defaultTextStyle, ...e };
    for (const r in t) {
      const i = r;
      this[i] = t[r];
    }
    this.update();
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   * @member {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(e) {
    this._align = e, this.update();
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(e) {
    this._breakWords = e, this.update();
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(e) {
    e !== null && typeof e == "object" ? this._dropShadow = {
      ...K.defaultDropShadow,
      ...e
    } : this._dropShadow = e ? {
      ...K.defaultDropShadow
    } : null, this.update();
  }
  /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(e) {
    this._fontFamily = e, this.update();
  }
  /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(e) {
    typeof e == "string" ? this._fontSize = parseInt(e, 10) : this._fontSize = e, this.update();
  }
  /**
   * The font style.
   * @member {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(e) {
    this._fontStyle = e, this.update();
  }
  /**
   * The font variant.
   * @member {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(e) {
    this._fontVariant = e, this.update();
  }
  /**
   * The font weight.
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(e) {
    this._fontWeight = e, this.update();
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(e) {
    this._leading = e, this.update();
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(e) {
    this._letterSpacing = e, this.update();
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(e) {
    this._lineHeight = e, this.update();
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(e) {
    this._padding = e, this.update();
  }
  /** Trim transparent borders. This is an expensive operation so only use this if you have to! */
  get trim() {
    return this._trim;
  }
  set trim(e) {
    this._trim = e, this.update();
  }
  /**
   * The baseline of the text that is rendered.
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(e) {
    this._textBaseline = e, this.update();
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   * @member {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(e) {
    this._whiteSpace = e, this.update();
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(e) {
    this._wordWrap = e, this.update();
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(e) {
    this._wordWrapWidth = e, this.update();
  }
  /** A fillstyle that will be used on the text e.g., 'red', '#00FF00'. */
  get fill() {
    return this._originalFill;
  }
  set fill(e) {
    e !== this._originalFill && (this._originalFill = e, this._fill = Se(
      e === 0 ? "black" : e,
      we.defaultFillStyle
    ), this.update());
  }
  /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
  get stroke() {
    return this._originalStroke;
  }
  set stroke(e) {
    e !== this._originalStroke && (this._originalStroke = e, this._stroke = Se(e, we.defaultStrokeStyle), this.update());
  }
  _generateKey() {
    return this._styleKey = rt(this), this._styleKey;
  }
  update() {
    this._styleKey = null, this.emit("update", this);
  }
  /** Resets all properties to the default values */
  reset() {
    const e = K.defaultTextStyle;
    for (const t in e)
      this[t] = e[t];
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * @returns New cloned TextStyle object
   */
  clone() {
    return new K({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      textBaseline: this.textBaseline,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth
    });
  }
  /**
   * Destroys this text style.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the texture of the this style
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the this style
   */
  destroy(e = !1) {
    var r, i, n, a;
    if (this.removeAllListeners(), typeof e == "boolean" ? e : e == null ? void 0 : e.texture) {
      const o = typeof e == "boolean" ? e : e == null ? void 0 : e.textureSource;
      (r = this._fill) != null && r.texture && this._fill.texture.destroy(o), (i = this._originalFill) != null && i.texture && this._originalFill.texture.destroy(o), (n = this._stroke) != null && n.texture && this._stroke.texture.destroy(o), (a = this._originalStroke) != null && a.texture && this._originalStroke.texture.destroy(o);
    }
    this._fill = null, this._stroke = null, this.dropShadow = null, this._originalStroke = null, this._originalFill = null;
  }
};
ue.defaultDropShadow = {
  /** Set alpha for the drop shadow */
  alpha: 1,
  /** Set a angle of the drop shadow */
  angle: Math.PI / 6,
  /** Set a shadow blur radius */
  blur: 0,
  /** A fill style to be used on the  e.g., 'red', '#00FF00' */
  color: "black",
  /** Set a distance of the drop shadow */
  distance: 5
};
ue.defaultTextStyle = {
  /**
   * See {@link TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */
  align: "left",
  /** See {@link TextStyle.breakWords} */
  breakWords: !1,
  /** See {@link TextStyle.dropShadow} */
  dropShadow: null,
  /**
   * See {@link TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  fill: "black",
  /**
   * See {@link TextStyle.fontFamily}
   * @type {string|string[]}
   */
  fontFamily: "Arial",
  /**
   * See {@link TextStyle.fontSize}
   * @type {number|string}
   */
  fontSize: 26,
  /**
   * See {@link TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */
  fontStyle: "normal",
  /**
   * See {@link TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */
  fontVariant: "normal",
  /**
   * See {@link TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  fontWeight: "normal",
  /** See {@link TextStyle.leading} */
  leading: 0,
  /** See {@link TextStyle.letterSpacing} */
  letterSpacing: 0,
  /** See {@link TextStyle.lineHeight} */
  lineHeight: 0,
  /** See {@link TextStyle.padding} */
  padding: 0,
  /**
   * See {@link TextStyle.stroke}
   * @type {string|number}
   */
  stroke: null,
  /**
   * See {@link TextStyle.textBaseline}
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  textBaseline: "alphabetic",
  /** See {@link TextStyle.trim} */
  trim: !1,
  /**
   * See {@link TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */
  whiteSpace: "pre",
  /** See {@link TextStyle.wordWrap} */
  wordWrap: !1,
  /** See {@link TextStyle.wordWrapWidth} */
  wordWrapWidth: 100
};
let V = ue;
function Nt(s) {
  const e = s;
  if (typeof e.dropShadow == "boolean" && e.dropShadow) {
    const t = V.defaultDropShadow;
    s.dropShadow = {
      alpha: e.dropShadowAlpha ?? t.alpha,
      angle: e.dropShadowAngle ?? t.angle,
      blur: e.dropShadowBlur ?? t.blur,
      color: e.dropShadowColor ?? t.color,
      distance: e.dropShadowDistance ?? t.distance
    };
  }
  if (e.strokeThickness !== void 0) {
    R(W, "strokeThickness is now a part of stroke");
    const t = e.stroke;
    s.stroke = {
      color: t,
      width: e.strokeThickness
    };
  }
  if (Array.isArray(e.fill)) {
    R(W, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    const t = new De(0, 0, 0, s.fontSize * 1.7), r = e.fill.map((i) => G.shared.setValue(i).toNumber());
    r.forEach((i, n) => {
      const a = e.fillGradientStops[n] ?? n / r.length;
      t.addColorStop(a, i);
    }), s.fill = {
      fill: t
    };
  }
}
function Q(s, e) {
  if (s.texture === U.WHITE && !s.fill)
    return G.shared.setValue(s.color).toHex();
  if (s.fill) {
    if (s.fill instanceof Mt) {
      const t = s.fill, r = e.createPattern(t.texture.source.resource, "repeat"), i = t.transform.copyTo(H.shared);
      return i.scale(
        t.texture.frame.width,
        t.texture.frame.height
      ), r.setTransform(i), r;
    } else if (s.fill instanceof De) {
      const t = s.fill;
      if (t.type === "linear") {
        const r = e.createLinearGradient(
          t.x0,
          t.y0,
          t.x1,
          t.y1
        );
        return t.gradientStops.forEach((i) => {
          r.addColorStop(i.offset, G.shared.setValue(i.color).toHex());
        }), r;
      }
    }
  } else {
    const t = e.createPattern(s.texture.source.resource, "repeat"), r = s.matrix.copyTo(H.shared);
    return r.scale(s.texture.frame.width, s.texture.frame.height), t.setTransform(r), t;
  }
  return Y("FillStyle not recognised", s), "red";
}
class st extends Oe {
  constructor() {
    super(...arguments), this.chars = /* @__PURE__ */ Object.create(null), this.lineHeight = 0, this.fontFamily = "", this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 }, this.baseLineOffset = 0, this.distanceField = { type: "none", range: 0 }, this.pages = [], this.baseMeasurementFontSize = 100, this.baseRenderedFontSize = 100;
  }
  /**
   * The name of the font face.
   * @deprecated since 8.0.0 Use `fontFamily` instead.
   */
  get font() {
    return R(W, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."), this.fontFamily;
  }
  /**
   * The map of base page textures (i.e., sheets of glyphs).
   * @deprecated since 8.0.0 Use `pages` instead.
   */
  get pageTextures() {
    return R(W, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  /**
   * The size of the font face in pixels.
   * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
   */
  get size() {
    return R(W, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."), this.fontMetrics.fontSize;
  }
  /**
   * The kind of distance field for this font or "none".
   * @deprecated since 8.0.0 Use `distanceField.type` instead.
   */
  get distanceFieldRange() {
    return R(W, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."), this.distanceField.range;
  }
  /**
   * The range of the distance field in pixels.
   * @deprecated since 8.0.0 Use `distanceField.range` instead.
   */
  get distanceFieldType() {
    return R(W, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."), this.distanceField.type;
  }
  destroy(e = !1) {
    this.emit("destroy", this), this.removeAllListeners();
    for (const t in this.chars)
      this.chars[t].texture.destroy();
    this.chars = null, e && (this.pages.forEach((t) => t.texture.destroy(!0)), this.pages = null);
  }
}
function nt(s) {
  if (s === "")
    return [];
  typeof s == "string" && (s = [s]);
  const e = [];
  for (let t = 0, r = s.length; t < r; t++) {
    const i = s[t];
    if (Array.isArray(i)) {
      if (i.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);
      if (i[0].length === 0 || i[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const n = i[0].charCodeAt(0), a = i[1].charCodeAt(0);
      if (a < n)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let o = n, c = a; o <= c; o++)
        e.push(String.fromCharCode(o));
    } else
      e.push(...Array.from(i));
  }
  if (e.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return e;
}
class Ce extends st {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(e) {
    super(), this.resolution = 1, this.pages = [], this._padding = 4, this._measureCache = /* @__PURE__ */ Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentPageIndex = -1, this._skipKerning = !1;
    const t = e, r = t.style.clone();
    t.overrideFill && (r._fill.color = 16777215, r._fill.alpha = 1, r._fill.texture = U.WHITE, r._fill.fill = null);
    const i = r.fontSize;
    r.fontSize = this.baseMeasurementFontSize;
    const n = J(r);
    t.overrideSize ? r._stroke && (r._stroke.width *= this.baseRenderedFontSize / i) : r.fontSize = this.baseRenderedFontSize = i, this._style = r, this._skipKerning = t.skipKerning ?? !1, this.resolution = t.resolution ?? 1, this._padding = t.padding ?? 4, this.fontMetrics = L.measureFont(n), this.lineHeight = r.lineHeight || this.fontMetrics.fontSize || r.fontSize;
  }
  ensureCharacters(e) {
    var m, x;
    const t = nt(e).filter((_) => !this._currentChars.includes(_)).filter((_, b, S) => S.indexOf(_) === b);
    if (!t.length)
      return;
    this._currentChars = [...this._currentChars, ...t];
    let r;
    this._currentPageIndex === -1 ? r = this._nextPage() : r = this.pages[this._currentPageIndex];
    let { canvas: i, context: n } = r.canvasAndContext, a = r.texture.source;
    const o = this._style;
    let c = this._currentX, h = this._currentY;
    const l = this.baseRenderedFontSize / this.baseMeasurementFontSize, d = this._padding * l, u = o.fontStyle === "italic" ? 2 : 1;
    let f = 0, p = !1;
    for (let _ = 0; _ < t.length; _++) {
      const b = t[_], S = L.measureText(b, o, i, !1);
      S.lineHeight = S.height;
      const y = u * S.width * l, T = S.height * l, B = y + d * 2, v = T + d * 2;
      if (p = !1, b !== `
` && b !== "\r" && b !== "	" && b !== " " && (p = !0, f = Math.ceil(Math.max(v, f))), c + B > 512 && (h += f, f = v, c = 0, h + f > 512)) {
        a.update();
        const k = this._nextPage();
        i = k.canvasAndContext.canvas, n = k.canvasAndContext.context, a = k.texture.source, h = 0;
      }
      const C = y / l - (((m = o.dropShadow) == null ? void 0 : m.distance) ?? 0) - (((x = o._stroke) == null ? void 0 : x.width) ?? 0);
      if (this.chars[b] = {
        id: b.codePointAt(0),
        xOffset: -this._padding,
        yOffset: -this._padding,
        xAdvance: C,
        kerning: {}
      }, p) {
        this._drawGlyph(
          n,
          S,
          c + d,
          h + d,
          l,
          o
        );
        const k = a.width * l, E = a.height * l, Z = new q(
          c / k * a.width,
          h / E * a.height,
          B / k * a.width,
          v / E * a.height
        );
        this.chars[b].texture = new U({
          source: a,
          frame: Z
        }), c += Math.ceil(B);
      }
    }
    a.update(), this._currentX = c, this._currentY = h, this._skipKerning && this._applyKerning(t, n);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    return R(W, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  _applyKerning(e, t) {
    const r = this._measureCache;
    for (let i = 0; i < e.length; i++) {
      const n = e[i];
      for (let a = 0; a < this._currentChars.length; a++) {
        const o = this._currentChars[a];
        let c = r[n];
        c || (c = r[n] = t.measureText(n).width);
        let h = r[o];
        h || (h = r[o] = t.measureText(o).width);
        let l = t.measureText(n + o).width, d = l - (c + h);
        d && (this.chars[n].kerning[o] = d), l = t.measureText(n + o).width, d = l - (c + h), d && (this.chars[o].kerning[n] = d);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const e = this.resolution, t = D.getOptimalCanvasAndContext(512, 512, e);
    this._setupContext(t.context, this._style, e);
    const r = e * (this.baseRenderedFontSize / this.baseMeasurementFontSize), i = new U({
      source: new kt({
        resource: t.canvas,
        resolution: r,
        alphaMode: "premultiply-alpha-on-upload"
      })
    }), n = {
      canvasAndContext: t,
      texture: i
    };
    return this.pages[this._currentPageIndex] = n, n;
  }
  // canvas style!
  _setupContext(e, t, r) {
    t.fontSize = this.baseRenderedFontSize, e.scale(r, r), e.font = J(t), t.fontSize = this.baseMeasurementFontSize, e.textBaseline = t.textBaseline;
    const i = t._stroke, n = (i == null ? void 0 : i.width) ?? 0;
    if (i && (e.lineWidth = n, e.lineJoin = i.join, e.miterLimit = i.miterLimit, e.strokeStyle = Q(i, e)), t._fill && (e.fillStyle = Q(t._fill, e)), t.dropShadow) {
      const a = t.dropShadow, o = G.shared.setValue(a.color).toArray(), c = a.blur * r, h = a.distance * r;
      e.shadowColor = `rgba(${o[0] * 255},${o[1] * 255},${o[2] * 255},${a.alpha})`, e.shadowBlur = c, e.shadowOffsetX = Math.cos(a.angle) * h, e.shadowOffsetY = Math.sin(a.angle) * h;
    } else
      e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
  }
  _drawGlyph(e, t, r, i, n, a) {
    const o = t.text, c = t.fontProperties, h = a._stroke, l = ((h == null ? void 0 : h.width) ?? 0) * n, d = r + l / 2, u = i - l / 2, f = c.descent * n, p = t.lineHeight * n;
    a.stroke && l && e.strokeText(o, d, u + p - f), a._fill && e.fillText(o, d, u + p - f);
  }
  destroy() {
    super.destroy();
    for (let e = 0; e < this.pages.length; e++) {
      const { canvasAndContext: t, texture: r } = this.pages[e];
      D.returnCanvasAndContext(t), r.destroy(!0);
    }
    this.pages = null;
  }
}
function at(s, e, t) {
  const r = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: e.fontSize / t.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  r.offsetY = t.baseLineOffset;
  let i = r.lines[0], n = null, a = !0;
  const o = {
    spaceWord: !1,
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  }, c = (f) => {
    const p = i.width;
    for (let m = 0; m < o.index; m++) {
      const x = f.positions[m];
      i.chars.push(f.chars[m]), i.charPositions.push(x + p);
    }
    i.width += f.width, a = !1, o.width = 0, o.index = 0, o.chars.length = 0;
  }, h = () => {
    let f = i.chars.length - 1, p = i.chars[f];
    for (; p === " "; )
      i.width -= t.chars[p].xAdvance, p = i.chars[--f];
    r.width = Math.max(r.width, i.width), i = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    }, a = !0, r.lines.push(i), r.height += t.lineHeight;
  }, l = t.baseMeasurementFontSize / e.fontSize, d = e.letterSpacing * l, u = e.wordWrapWidth * l;
  for (let f = 0; f < s.length + 1; f++) {
    let p;
    const m = f === s.length;
    m || (p = s[f]);
    const x = t.chars[p] || t.chars[" "];
    if (/(?:\s)/.test(p) || p === "\r" || p === `
` || m) {
      if (!a && e.wordWrap && i.width + o.width - d > u ? (h(), c(o), m || i.charPositions.push(0)) : (o.start = i.width, c(o), m || i.charPositions.push(0)), p === "\r" || p === `
`)
        i.width !== 0 && h();
      else if (!m) {
        const y = x.xAdvance + (x.kerning[n] || 0) + d;
        i.width += y, i.spaceWidth = y, i.spacesIndex.push(i.charPositions.length), i.chars.push(p);
      }
    } else {
      const S = x.kerning[n] || 0, y = x.xAdvance + S + d;
      o.positions[o.index++] = o.width + S, o.chars.push(p), o.width += y;
    }
    n = p;
  }
  return h(), e.align === "center" ? qt(r) : e.align === "right" ? Jt(r) : e.align === "justify" && Qt(r), r;
}
function qt(s) {
  for (let e = 0; e < s.lines.length; e++) {
    const t = s.lines[e], r = s.width / 2 - t.width / 2;
    for (let i = 0; i < t.charPositions.length; i++)
      t.charPositions[i] += r;
  }
}
function Jt(s) {
  for (let e = 0; e < s.lines.length; e++) {
    const t = s.lines[e], r = s.width - t.width;
    for (let i = 0; i < t.charPositions.length; i++)
      t.charPositions[i] += r;
  }
}
function Qt(s) {
  const e = s.width;
  for (let t = 0; t < s.lines.length; t++) {
    const r = s.lines[t];
    let i = 0, n = r.spacesIndex[i++], a = 0;
    const o = r.spacesIndex.length, h = (e - r.width) / o;
    for (let l = 0; l < r.charPositions.length; l++)
      l === n && (n = r.spacesIndex[i++], a += h), r.charPositions[l] += a;
  }
}
class Zt {
  constructor() {
    this.ALPHA = [["a", "z"], ["A", "Z"], " "], this.NUMERIC = [["0", "9"]], this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], this.ASCII = [[" ", "~"]], this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: !1
    };
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(e, t) {
    var a;
    let r = `${t.fontFamily}-bitmap`, i = !0;
    if (t._fill.fill && (r += t._fill.fill.uid, i = !1), !A.has(r)) {
      const o = new Ce({
        style: t,
        overrideFill: i,
        overrideSize: !0,
        ...this.defaultOptions
      });
      o.once("destroy", () => A.remove(r)), A.set(
        r,
        o
      );
    }
    const n = A.get(r);
    return (a = n.ensureCharacters) == null || a.call(n, e), n;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   */
  getLayout(e, t) {
    const r = this.getFont(e, t);
    return at(e.split(""), t, r);
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   */
  measureText(e, t) {
    return this.getLayout(e, t);
  }
  // eslint-disable-next-line max-len
  install(...e) {
    var h, l, d, u;
    let t = e[0];
    typeof t == "string" && (t = {
      name: t,
      style: e[1],
      chars: (h = e[2]) == null ? void 0 : h.chars,
      resolution: (l = e[2]) == null ? void 0 : l.resolution,
      padding: (d = e[2]) == null ? void 0 : d.padding,
      skipKerning: (u = e[2]) == null ? void 0 : u.skipKerning
    }, R(W, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
    const r = t == null ? void 0 : t.name;
    if (!r)
      throw new Error("[BitmapFontManager] Property `name` is required.");
    t = { ...this.defaultOptions, ...t };
    const i = t.style, n = i instanceof V ? i : new V(i), a = n._fill.fill !== null && n._fill.fill !== void 0, o = new Ce({
      style: n,
      overrideFill: a,
      skipKerning: t.skipKerning,
      padding: t.padding,
      resolution: t.resolution,
      overrideSize: !1
    }), c = nt(t.chars);
    return o.ensureCharacters(c.join("")), A.set(`${r}-bitmap`, o), o.once("destroy", () => A.remove(`${r}-bitmap`)), o;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(e) {
    const t = `${e}-bitmap`, r = A.get(t);
    r && (A.remove(t), r.destroy());
  }
}
const ce = new Zt();
function er(s) {
  const e = s._stroke, t = s._fill, i = [`div { ${[
    `color: ${G.shared.setValue(t.color).toHex()}`,
    `font-size: ${s.fontSize}px`,
    `font-family: ${s.fontFamily}`,
    `font-weight: ${s.fontWeight}`,
    `font-style: ${s.fontStyle}`,
    `font-variant: ${s.fontVariant}`,
    `letter-spacing: ${s.letterSpacing}px`,
    `text-align: ${s.align}`,
    `padding: ${s.padding}px`,
    `white-space: ${s.whiteSpace === "pre" && s.wordWrap ? "pre-wrap" : s.whiteSpace}`,
    ...s.lineHeight ? [`line-height: ${s.lineHeight}px`] : [],
    ...s.wordWrap ? [
      `word-wrap: ${s.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${s.wordWrapWidth}px`
    ] : [],
    ...e ? [ct(e)] : [],
    ...s.dropShadow ? [ot(s.dropShadow)] : [],
    ...s.cssOverrides
  ].join(";")} }`];
  return tr(s.tagStyles, i), i.join(" ");
}
function ot(s) {
  const e = G.shared.setValue(s.color).setAlpha(s.alpha).toHexa(), t = Math.round(Math.cos(s.angle) * s.distance), r = Math.round(Math.sin(s.angle) * s.distance), i = `${t}px ${r}px`;
  return s.blur > 0 ? `text-shadow: ${i} ${s.blur}px ${e}` : `text-shadow: ${i} ${e}`;
}
function ct(s) {
  return [
    `-webkit-text-stroke-width: ${s.width}px`,
    `-webkit-text-stroke-color: ${G.shared.setValue(s.color).toHex()}`,
    `text-stroke-width: ${s.width}px`,
    `text-stroke-color: ${G.shared.setValue(s.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
const Be = {
  fontSize: "font-size: {{VALUE}}px",
  fontFamily: "font-family: {{VALUE}}",
  fontWeight: "font-weight: {{VALUE}}",
  fontStyle: "font-style: {{VALUE}}",
  fontVariant: "font-variant: {{VALUE}}",
  letterSpacing: "letter-spacing: {{VALUE}}px",
  align: "text-align: {{VALUE}}",
  padding: "padding: {{VALUE}}px",
  whiteSpace: "white-space: {{VALUE}}",
  lineHeight: "line-height: {{VALUE}}px",
  wordWrapWidth: "max-width: {{VALUE}}px"
}, Fe = {
  fill: (s) => `color: ${G.shared.setValue(s).toHex()}`,
  breakWords: (s) => `word-wrap: ${s ? "break-all" : "break-word"}`,
  stroke: ct,
  dropShadow: ot
};
function tr(s, e) {
  for (const t in s) {
    const r = s[t], i = [];
    for (const n in r)
      Fe[n] ? i.push(Fe[n](r[n])) : Be[n] && i.push(Be[n].replace("{{VALUE}}", r[n]));
    e.push(`${t} { ${i.join(";")} }`);
  }
}
class fe extends V {
  constructor(e = {}) {
    super(e), this._cssOverrides = [], this.cssOverrides ?? (this.cssOverrides = e.cssOverrides), this.tagStyles = e.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(e) {
    this._cssOverrides = e instanceof Array ? e : [e], this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    return this._styleKey = rt(this) + this._cssOverrides.join("-"), this._styleKey;
  }
  update() {
    this._cssStyle = null, super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new fe({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    return this._cssStyle || (this._cssStyle = er(this)), this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...e) {
    const t = e.filter((r) => !this.cssOverrides.includes(r));
    t.length > 0 && (this.cssOverrides.push(...t), this.update());
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...e) {
    const t = e.filter((r) => this.cssOverrides.includes(r));
    t.length > 0 && (this.cssOverrides = this.cssOverrides.filter((r) => !t.includes(r)), this.update());
  }
  set fill(e) {
    typeof e != "string" && typeof e != "number" && Y("[HTMLTextStyle] only color fill is not supported by HTMLText"), super.fill = e;
  }
  set stroke(e) {
    e && typeof e != "string" && typeof e != "number" && Y("[HTMLTextStyle] only color stroke is not supported by HTMLText"), super.stroke = e;
  }
}
const Pe = "http://www.w3.org/2000/svg", Me = "http://www.w3.org/1999/xhtml";
class lt {
  constructor() {
    this.svgRoot = document.createElementNS(Pe, "svg"), this.foreignObject = document.createElementNS(Pe, "foreignObject"), this.domElement = document.createElementNS(Me, "div"), this.styleElement = document.createElementNS(Me, "style"), this.image = new Image();
    const { foreignObject: e, svgRoot: t, styleElement: r, domElement: i } = this;
    e.setAttribute("width", "10000"), e.setAttribute("height", "10000"), e.style.overflow = "hidden", t.appendChild(e), e.appendChild(r), e.appendChild(i);
  }
}
let ke;
function rr(s, e, t, r) {
  r = r || ke || (ke = new lt());
  const { domElement: i, styleElement: n, svgRoot: a } = r;
  i.innerHTML = `<style>${e.cssStyle}</style><div>${s}</div>`, i.setAttribute("style", "transform-origin: top left; display: inline-block"), t && (n.textContent = t), document.body.appendChild(a);
  const o = i.getBoundingClientRect();
  a.remove();
  const c = L.measureFont(e.fontStyle).descent;
  return {
    width: o.width,
    height: o.height + c
  };
}
class ht {
  constructor(e, t) {
    this.state = Ee.for2d(), this._graphicsBatchesHash = /* @__PURE__ */ Object.create(null), this.renderer = e, this._adaptor = t, this._adaptor.init();
  }
  validateRenderable(e) {
    const t = e.context, r = !!this._graphicsBatchesHash[e.uid], i = this.renderer.graphicsContext.updateGpuContext(t);
    return !!(i.isBatchable || r !== i.isBatchable);
  }
  addRenderable(e, t) {
    const r = this.renderer.graphicsContext.updateGpuContext(e.context);
    e._didGraphicsUpdate && (e._didGraphicsUpdate = !1, this._rebuild(e)), r.isBatchable ? this._addToBatcher(e, t) : (this.renderer.renderPipes.batch.break(t), t.add(e));
  }
  updateRenderable(e) {
    const t = this._graphicsBatchesHash[e.uid];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const i = t[r];
        i.batcher.updateElement(i);
      }
  }
  destroyRenderable(e) {
    this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid);
  }
  execute(e) {
    if (!e.isRenderable)
      return;
    const t = this.renderer, r = e.context;
    if (!t.graphicsContext.getGpuContext(r).batches.length)
      return;
    const n = r.customShader || this._adaptor.shader;
    this.state.blendMode = e.groupBlendMode;
    const a = n.resources.localUniforms.uniforms;
    a.uTransformMatrix = e.groupTransform, a.uRound = t._roundPixels | e._roundPixels, he(
      e.groupColorAlpha,
      a.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _rebuild(e) {
    const t = !!this._graphicsBatchesHash[e.uid], r = this.renderer.graphicsContext.updateGpuContext(e.context);
    t && this._removeBatchForRenderable(e.uid), r.isBatchable && this._initBatchesForRenderable(e), e.batched = r.isBatchable;
  }
  _addToBatcher(e, t) {
    const r = this.renderer.renderPipes.batch, i = this._getBatchesForRenderable(e);
    for (let n = 0; n < i.length; n++) {
      const a = i[n];
      r.addToBatch(a, t);
    }
  }
  _getBatchesForRenderable(e) {
    return this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e);
  }
  _initBatchesForRenderable(e) {
    const t = e.context, r = this.renderer.graphicsContext.getGpuContext(t), i = this.renderer._roundPixels | e._roundPixels, n = r.batches.map((a) => {
      const o = P.get(Rt);
      return a.copyTo(o), o.renderable = e, o.roundPixels = i, o;
    });
    return this._graphicsBatchesHash[e.uid] = n, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), n;
  }
  _removeBatchForRenderable(e) {
    this._graphicsBatchesHash[e].forEach((t) => {
      P.return(t);
    }), this._graphicsBatchesHash[e] = null;
  }
  destroy() {
    this.renderer = null, this._adaptor.destroy(), this._adaptor = null, this.state = null;
    for (const e in this._graphicsBatchesHash)
      this._removeBatchForRenderable(e);
    this._graphicsBatchesHash = null;
  }
}
ht.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "graphics"
};
const dt = class ut extends de {
  constructor(...e) {
    super({});
    let t = e[0] ?? {};
    typeof t == "number" && (R(W, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), t = {
      width: t,
      height: e[1],
      verticesX: e[2],
      verticesY: e[3]
    }), this.build(t);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(e) {
    e = { ...ut.defaultOptions, ...e }, this.verticesX = this.verticesX ?? e.verticesX, this.verticesY = this.verticesY ?? e.verticesY, this.width = this.width ?? e.width, this.height = this.height ?? e.height;
    const t = this.verticesX * this.verticesY, r = [], i = [], n = [], a = this.verticesX - 1, o = this.verticesY - 1, c = this.width / a, h = this.height / o;
    for (let d = 0; d < t; d++) {
      const u = d % this.verticesX, f = d / this.verticesX | 0;
      r.push(u * c, f * h), i.push(u / a, f / o);
    }
    const l = a * o;
    for (let d = 0; d < l; d++) {
      const u = d % a, f = d / a | 0, p = f * this.verticesX + u, m = f * this.verticesX + u + 1, x = (f + 1) * this.verticesX + u, _ = (f + 1) * this.verticesX + u + 1;
      n.push(
        p,
        m,
        x,
        m,
        _,
        x
      );
    }
    this.buffers[0].data = new Float32Array(r), this.buffers[1].data = new Float32Array(i), this.indexBuffer.data = new Uint32Array(n), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
  }
};
dt.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let ir = dt;
class pe {
  constructor() {
    this.batcher = null, this.batch = null, this.roundPixels = 0, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
  }
  get blendMode() {
    return this.mesh.groupBlendMode;
  }
  reset() {
    this.mesh = null, this.texture = null, this.batcher = null, this.batch = null;
  }
  packIndex(e, t, r) {
    const i = this.geometry.indices;
    for (let n = 0; n < i.length; n++)
      e[t++] = i[n] + r;
  }
  packAttributes(e, t, r, i) {
    const n = this.mesh, a = this.geometry, o = n.groupTransform, c = i << 16 | this.roundPixels & 65535, h = o.a, l = o.b, d = o.c, u = o.d, f = o.tx, p = o.ty, m = a.positions, x = a.getBuffer("aUV"), _ = x.data;
    let b = _;
    const S = this.texture.textureMatrix;
    S.isSimple || (b = this._transformedUvs, (this._textureMatrixUpdateId !== S._updateID || this._uvUpdateId !== x._updateID) && ((!b || b.length < _.length) && (b = this._transformedUvs = new Float32Array(_.length)), this._textureMatrixUpdateId = S._updateID, this._uvUpdateId = x._updateID, S.multiplyUvs(_, b)));
    const y = n.groupColorAlpha;
    for (let T = 0; T < m.length; T += 2) {
      const B = m[T], v = m[T + 1];
      e[r] = h * B + d * v + f, e[r + 1] = l * B + u * v + p, e[r + 2] = b[T], e[r + 3] = b[T + 1], t[r + 4] = y, t[r + 5] = c, r += 6;
    }
  }
  get vertexSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}
class ft {
  constructor(e, t) {
    this.localUniforms = new X({
      uTransformMatrix: { value: new H(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" }
    }), this.localUniformsBindGroup = new Ge({
      0: this.localUniforms
    }), this._meshDataHash = /* @__PURE__ */ Object.create(null), this._gpuBatchableMeshHash = /* @__PURE__ */ Object.create(null), this.renderer = e, this._adaptor = t, this._adaptor.init();
  }
  validateRenderable(e) {
    const t = this._getMeshData(e), r = t.batched, i = e.batched;
    if (t.batched = i, r !== i)
      return !0;
    if (i) {
      const n = e._geometry;
      if (n.indices.length !== t.indexSize || n.positions.length !== t.vertexSize)
        return t.indexSize = n.indices.length, t.vertexSize = n.positions.length, !0;
      const a = this._getBatchableMesh(e), o = e.texture;
      if (a.texture._source !== o._source && a.texture._source !== o._source)
        return !a.batcher.checkAndUpdateTexture(a, o);
    }
    return !1;
  }
  addRenderable(e, t) {
    const r = this.renderer.renderPipes.batch, { batched: i } = this._getMeshData(e);
    if (i) {
      const n = this._getBatchableMesh(e);
      n.texture = e._texture, n.geometry = e._geometry, r.addToBatch(n);
    } else
      r.break(t), t.add({
        renderPipeId: "mesh",
        mesh: e
      });
  }
  updateRenderable(e) {
    if (e.batched) {
      const t = this._gpuBatchableMeshHash[e.uid];
      t.texture = e._texture, t.geometry = e._geometry, t.batcher.updateElement(t);
    }
  }
  destroyRenderable(e) {
    this._meshDataHash[e.uid] = null;
    const t = this._gpuBatchableMeshHash[e.uid];
    t && (P.return(t), this._gpuBatchableMeshHash[e.uid] = null);
  }
  execute({ mesh: e }) {
    if (!e.isRenderable)
      return;
    e.state.blendMode = e.groupBlendMode;
    const t = this.localUniforms;
    t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), he(
      e.groupColorAlpha,
      t.uniforms.uColor,
      0
    ), this._adaptor.execute(this, e);
  }
  _getMeshData(e) {
    return this._meshDataHash[e.uid] || this._initMeshData(e);
  }
  _initMeshData(e) {
    var t, r;
    return this._meshDataHash[e.uid] = {
      batched: e.batched,
      indexSize: (t = e._geometry.indices) == null ? void 0 : t.length,
      vertexSize: (r = e._geometry.positions) == null ? void 0 : r.length
    }, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._meshDataHash[e.uid];
  }
  _getBatchableMesh(e) {
    return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
  }
  _initBatchableMesh(e) {
    const t = P.get(pe);
    return t.mesh = e, t.texture = e._texture, t.roundPixels = this.renderer._roundPixels | e._roundPixels, this._gpuBatchableMeshHash[e.uid] = t, t.mesh = e, t;
  }
  destroy() {
    for (const e in this._gpuBatchableMeshHash)
      this._gpuBatchableMeshHash[e] && P.return(this._gpuBatchableMeshHash[e]);
    this._gpuBatchableMeshHash = null, this._meshDataHash = null, this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
  }
}
ft.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "mesh"
};
const pt = class gt extends ir {
  constructor(e = {}) {
    e = { ...gt.defaultOptions, ...e }, super({
      width: e.width,
      height: e.height,
      verticesX: 4,
      verticesY: 4
    }), this.update(e);
  }
  /**
   * Updates the NineSliceGeometry with the options.
   * @param options - The options of the NineSliceGeometry.
   */
  update(e) {
    this.width = e.width ?? this.width, this.height = e.height ?? this.height, this._originalWidth = e.originalWidth ?? this._originalWidth, this._originalHeight = e.originalHeight ?? this._originalHeight, this._leftWidth = e.leftWidth ?? this._leftWidth, this._rightWidth = e.rightWidth ?? this._rightWidth, this._topHeight = e.topHeight ?? this._topHeight, this._bottomHeight = e.bottomHeight ?? this._bottomHeight, this.updateUvs(), this.updatePositions();
  }
  /** Updates the positions of the vertices. */
  updatePositions() {
    const e = this.positions, t = this._leftWidth + this._rightWidth, r = this.width > t ? 1 : this.width / t, i = this._topHeight + this._bottomHeight, n = this.height > i ? 1 : this.height / i, a = Math.min(r, n);
    e[9] = e[11] = e[13] = e[15] = this._topHeight * a, e[17] = e[19] = e[21] = e[23] = this.height - this._bottomHeight * a, e[25] = e[27] = e[29] = e[31] = this.height, e[2] = e[10] = e[18] = e[26] = this._leftWidth * a, e[4] = e[12] = e[20] = e[28] = this.width - this._rightWidth * a, e[6] = e[14] = e[22] = e[30] = this.width, this.getBuffer("aPosition").update();
  }
  /** Updates the UVs of the vertices. */
  updateUvs() {
    const e = this.uvs;
    e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1;
    const t = 1 / this._originalWidth, r = 1 / this._originalHeight;
    e[2] = e[10] = e[18] = e[26] = t * this._leftWidth, e[9] = e[11] = e[13] = e[15] = r * this._topHeight, e[4] = e[12] = e[20] = e[28] = 1 - t * this._rightWidth, e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight, this.getBuffer("aUV").update();
  }
};
pt.defaultOptions = {
  /** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  width: 100,
  /** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */
  height: 100,
  /** The width of the left column. */
  leftWidth: 10,
  /** The height of the top row. */
  topHeight: 10,
  /** The width of the right column. */
  rightWidth: 10,
  /** The height of the bottom row. */
  bottomHeight: 10,
  /** The original width of the texture */
  originalWidth: 100,
  /** The original height of the texture */
  originalHeight: 100
};
let sr = pt;
class mt {
  constructor(e) {
    this._gpuSpriteHash = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  addRenderable(e, t) {
    const r = this._getGpuSprite(e);
    e._didSpriteUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    e._didSpriteUpdate && this._updateBatchableSprite(e, t), t.batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = e._texture, r = this._getGpuSprite(e);
    return r.texture._source !== t._source ? !r.batcher.checkAndUpdateTexture(r, t) : !1;
  }
  destroyRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    P.return(t), this._gpuSpriteHash[e.uid] = null;
  }
  _updateBatchableSprite(e, t) {
    e._didSpriteUpdate = !1, t.geometry.update(e), t.texture = e._texture;
  }
  _getGpuSprite(e) {
    return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = new pe();
    return t.geometry = new sr(), t.mesh = e, t.texture = e._texture, t.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuSpriteHash[e.uid] = t, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuSpriteHash)
      this._gpuSpriteHash[e].geometry.destroy();
    this._gpuSpriteHash = null, this._renderer = null;
  }
}
mt.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "nineSliceSprite"
};
const nr = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `
    ),
    main: (
      /* wgsl */
      `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `
    )
  }
}, ar = {
  name: "tiling-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `
    ),
    main: (
      /* glsl */
      `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `
    ),
    main: (
      /* glsl */
      `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `
    )
  }
};
let se, ne;
class or extends $e {
  constructor() {
    se ?? (se = Ke({
      name: "tiling-sprite-shader",
      bits: [
        It,
        nr,
        Ye
      ]
    })), ne ?? (ne = Ve({
      name: "tiling-sprite-shader",
      bits: [
        Ht,
        ar,
        Xe
      ]
    }));
    const e = new X({
      uMapCoord: { value: new H(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new H(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: ne,
      gpuProgram: se,
      resources: {
        localUniforms: new X({
          uTransformMatrix: { value: new H(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms: e,
        uTexture: U.EMPTY.source,
        uSampler: U.EMPTY.source.style
      }
    });
  }
  updateUniforms(e, t, r, i, n, a) {
    const o = this.resources.tilingUniforms, c = a.width, h = a.height, l = a.textureMatrix, d = o.uniforms.uTextureTransform;
    d.set(
      r.a * c / e,
      r.b * c / t,
      r.c * h / e,
      r.d * h / t,
      r.tx / e,
      r.ty / t
    ), d.invert(), o.uniforms.uMapCoord = l.mapCoord, o.uniforms.uClampFrame = l.uClampFrame, o.uniforms.uClampOffset = l.uClampOffset, o.uniforms.uTextureTransform = d, o.uniforms.uSizeAnchor[0] = e, o.uniforms.uSizeAnchor[1] = t, o.uniforms.uSizeAnchor[2] = i, o.uniforms.uSizeAnchor[3] = n, a && (this.resources.uTexture = a.source, this.resources.uSampler = a.source.style);
  }
}
class cr extends de {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3])
    });
  }
}
function lr(s, e) {
  const t = s.anchor.x, r = s.anchor.y;
  e[0] = -t * s.width, e[1] = -r * s.height, e[2] = (1 - t) * s.width, e[3] = -r * s.height, e[4] = (1 - t) * s.width, e[5] = (1 - r) * s.height, e[6] = -t * s.width, e[7] = (1 - r) * s.height;
}
function hr(s, e, t, r) {
  let i = 0;
  const n = s.length / e, a = r.a, o = r.b, c = r.c, h = r.d, l = r.tx, d = r.ty;
  for (t *= e; i < n; ) {
    const u = s[t], f = s[t + 1];
    s[t] = a * u + c * f + l, s[t + 1] = o * u + h * f + d, t += e, i++;
  }
}
function dr(s, e) {
  const t = s.texture, r = t.frame.width, i = t.frame.height;
  let n = 0, a = 0;
  s._applyAnchorToTexture && (n = s.anchor.x, a = s.anchor.y), e[0] = e[6] = -n, e[2] = e[4] = 1 - n, e[1] = e[3] = -a, e[5] = e[7] = 1 - a;
  const o = H.shared;
  o.copyFrom(s._tileTransform.matrix), o.tx /= s.width, o.ty /= s.height, o.invert(), o.scale(s.width / r, s.height / i), hr(e, 2, 0, o);
}
const j = new cr();
class xt {
  constructor(e) {
    this._tilingSpriteDataHash = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getTilingSpriteData(e), r = t.canBatch;
    this._updateCanBatch(e);
    const i = t.canBatch;
    if (i && i === r) {
      const { batchableMesh: n } = t;
      if (n.texture._source !== e.texture._source)
        return !n.batcher.checkAndUpdateTexture(n, e.texture);
    }
    return r !== i;
  }
  addRenderable(e, t) {
    const r = this._renderer.renderPipes.batch;
    this._updateCanBatch(e);
    const i = this._getTilingSpriteData(e), { geometry: n, canBatch: a } = i;
    if (a) {
      i.batchableMesh || (i.batchableMesh = new pe());
      const o = i.batchableMesh;
      e._didTilingSpriteUpdate && (e._didTilingSpriteUpdate = !1, this._updateBatchableMesh(e), o.geometry = n, o.mesh = e, o.texture = e._texture), o.roundPixels = this._renderer._roundPixels | e._roundPixels, r.addToBatch(o);
    } else
      r.break(t), i.shader || (i.shader = new or()), this.updateRenderable(e), t.add(e);
  }
  execute(e) {
    const { shader: t } = this._tilingSpriteDataHash[e.uid];
    t.groups[0] = this._renderer.globalUniforms.bindGroup;
    const r = t.resources.localUniforms.uniforms;
    r.uTransformMatrix = e.groupTransform, r.uRound = this._renderer._roundPixels | e._roundPixels, he(
      e.groupColorAlpha,
      r.uColor,
      0
    ), this._renderer.encoder.draw({
      geometry: j,
      shader: t,
      state: Ee.default2d
    });
  }
  updateRenderable(e) {
    const t = this._getTilingSpriteData(e), { canBatch: r } = t;
    if (r) {
      const { batchableMesh: i } = t;
      e._didTilingSpriteUpdate && this._updateBatchableMesh(e), i.batcher.updateElement(i);
    } else if (e._didTilingSpriteUpdate) {
      const { shader: i } = t;
      i.updateUniforms(
        e.width,
        e.height,
        e._tileTransform.matrix,
        e.anchor.x,
        e.anchor.y,
        e.texture
      );
    }
    e._didTilingSpriteUpdate = !1;
  }
  destroyRenderable(e) {
    var r;
    const t = this._getTilingSpriteData(e);
    t.batchableMesh = null, (r = t.shader) == null || r.destroy(), this._tilingSpriteDataHash[e.uid] = null;
  }
  _getTilingSpriteData(e) {
    return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
  }
  _initTilingSpriteData(e) {
    const t = new de({
      indices: j.indices,
      positions: j.positions.slice(),
      uvs: j.uvs.slice()
    });
    return this._tilingSpriteDataHash[e.uid] = {
      canBatch: !0,
      renderable: e,
      geometry: t
    }, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._tilingSpriteDataHash[e.uid];
  }
  _updateBatchableMesh(e) {
    const t = this._getTilingSpriteData(e), { geometry: r } = t, i = e.texture.source.style;
    i.addressMode !== "repeat" && (i.addressMode = "repeat", i.update()), dr(e, r.uvs), lr(e, r.positions);
  }
  destroy() {
    for (const e in this._tilingSpriteDataHash)
      this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
    this._tilingSpriteDataHash = null, this._renderer = null;
  }
  _updateCanBatch(e) {
    const t = this._getTilingSpriteData(e), r = e.texture;
    let i = !0;
    return this._renderer.type === le.WEBGL && (i = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = r.textureMatrix.isSimple && (i || r.source.isPowerOfTwo), t.canBatch;
  }
}
xt.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "tilingSprite"
};
const ae = {
  test(s) {
    return typeof s == "string" && s.startsWith("info face=");
  },
  parse(s) {
    const e = s.match(/^[a-z]+\s+.+$/gm), t = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const d in e) {
      const u = e[d].match(/^[a-z]+/gm)[0], f = e[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), p = {};
      for (const m in f) {
        const x = f[m].split("="), _ = x[0], b = x[1].replace(/"/gm, ""), S = parseFloat(b), y = isNaN(S) ? b : S;
        p[_] = y;
      }
      t[u].push(p);
    }
    const r = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, [i] = t.info, [n] = t.common, [a] = t.distanceField ?? [];
    a && (r.distanceField = {
      range: parseInt(a.distanceRange, 10),
      type: a.fieldType
    }), r.fontSize = parseInt(i.size, 10), r.fontFamily = i.face, r.lineHeight = parseInt(n.lineHeight, 10);
    const o = t.page;
    for (let d = 0; d < o.length; d++)
      r.pages.push({
        id: parseInt(o[d].id, 10) || 0,
        file: o[d].file
      });
    const c = {};
    r.baseLineOffset = r.lineHeight - parseInt(n.base, 10);
    const h = t.char;
    for (let d = 0; d < h.length; d++) {
      const u = h[d], f = parseInt(u.id, 10);
      let p = u.letter ?? u.char ?? String.fromCharCode(f);
      p === "space" && (p = " "), c[f] = p, r.chars[p] = {
        id: f,
        // texture deets..
        page: parseInt(u.page, 10) || 0,
        x: parseInt(u.x, 10),
        y: parseInt(u.y, 10),
        width: parseInt(u.width, 10),
        height: parseInt(u.height, 10),
        xOffset: parseInt(u.xoffset, 10),
        yOffset: parseInt(u.yoffset, 10),
        xAdvance: parseInt(u.xadvance, 10),
        kerning: {}
      };
    }
    const l = t.kerning || [];
    for (let d = 0; d < l.length; d++) {
      const u = parseInt(l[d].first, 10), f = parseInt(l[d].second, 10), p = parseInt(l[d].amount, 10);
      r.chars[c[f]].kerning[c[u]] = p;
    }
    return r;
  }
}, Re = {
  test(s) {
    const e = s;
    return typeof e != "string" && "getElementsByTagName" in e && e.getElementsByTagName("page").length && e.getElementsByTagName("info")[0].getAttribute("face") !== null;
  },
  parse(s) {
    const e = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    }, t = s.getElementsByTagName("info")[0], r = s.getElementsByTagName("common")[0], i = s.getElementsByTagName("distanceField")[0];
    i && (e.distanceField = {
      type: i.getAttribute("fieldType"),
      range: parseInt(i.getAttribute("distanceRange"), 10)
    });
    const n = s.getElementsByTagName("page"), a = s.getElementsByTagName("char"), o = s.getElementsByTagName("kerning");
    e.fontSize = parseInt(t.getAttribute("size"), 10), e.fontFamily = t.getAttribute("face"), e.lineHeight = parseInt(r.getAttribute("lineHeight"), 10);
    for (let h = 0; h < n.length; h++)
      e.pages.push({
        id: parseInt(n[h].getAttribute("id"), 10) || 0,
        file: n[h].getAttribute("file")
      });
    const c = {};
    e.baseLineOffset = e.lineHeight - parseInt(r.getAttribute("base"), 10);
    for (let h = 0; h < a.length; h++) {
      const l = a[h], d = parseInt(l.getAttribute("id"), 10);
      let u = l.getAttribute("letter") ?? l.getAttribute("char") ?? String.fromCharCode(d);
      u === "space" && (u = " "), c[d] = u, e.chars[u] = {
        id: d,
        // texture deets..
        page: parseInt(l.getAttribute("page"), 10) || 0,
        x: parseInt(l.getAttribute("x"), 10),
        y: parseInt(l.getAttribute("y"), 10),
        width: parseInt(l.getAttribute("width"), 10),
        height: parseInt(l.getAttribute("height"), 10),
        // render deets..
        xOffset: parseInt(l.getAttribute("xoffset"), 10),
        yOffset: parseInt(l.getAttribute("yoffset"), 10),
        // + baseLineOffset,
        xAdvance: parseInt(l.getAttribute("xadvance"), 10),
        kerning: {}
      };
    }
    for (let h = 0; h < o.length; h++) {
      const l = parseInt(o[h].getAttribute("first"), 10), d = parseInt(o[h].getAttribute("second"), 10), u = parseInt(o[h].getAttribute("amount"), 10);
      e.chars[c[d]].kerning[c[l]] = u;
    }
    return e;
  }
}, Ae = {
  test(s) {
    return typeof s == "string" && s.includes("<font>") ? Re.test(O.get().parseXML(s)) : !1;
  },
  parse(s) {
    return Re.parse(O.get().parseXML(s));
  }
};
class _t extends st {
  constructor(e, t) {
    super();
    const { textures: r, data: i } = e;
    Object.keys(i.pages).forEach((n) => {
      const a = i.pages[parseInt(n, 10)], o = r[a.id];
      this.pages.push({ texture: o });
    }), Object.keys(i.chars).forEach((n) => {
      const a = i.chars[n], {
        frame: o,
        source: c
      } = r[a.page], h = new q(
        a.x + o.x,
        a.y + o.y,
        a.width,
        a.height
      ), l = new U({
        source: c,
        frame: h
      });
      this.chars[n] = {
        id: n.codePointAt(0),
        xOffset: a.xOffset,
        yOffset: a.yOffset,
        xAdvance: a.xAdvance,
        kerning: a.kerning ?? {},
        texture: l
      };
    }), this.baseRenderedFontSize = i.fontSize, this.baseMeasurementFontSize = i.fontSize, this.fontMetrics = {
      ascent: 0,
      descent: 0,
      fontSize: i.fontSize
    }, this.baseLineOffset = i.baseLineOffset, this.lineHeight = i.lineHeight, this.fontFamily = i.fontFamily, this.distanceField = i.distanceField ?? {
      type: "none",
      range: 0
    }, this.url = t;
  }
  /** Destroys the BitmapFont object. */
  destroy() {
    super.destroy();
    for (let e = 0; e < this.pages.length; e++) {
      const { texture: t } = this.pages[e];
      t.destroy(!0);
    }
    this.pages = null;
  }
  /**
   * Generates a bitmap-font for the given style and character set
   * @param options - Setup options for font generation.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.install('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText({ text: 'This is the title', fontFamily: 'TitleFont' });
   */
  static install(e) {
    ce.install(e);
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  static uninstall(e) {
    ce.uninstall(e);
  }
}
const ur = [".xml", ".fnt"], fr = {
  extension: w.CacheParser,
  test: (s) => s instanceof _t,
  getCacheableAssets(s, e) {
    const t = {};
    return s.forEach((r) => {
      t[r] = e;
    }), t[`${e.fontFamily}-bitmap`] = e, t;
  }
}, pr = {
  extension: {
    type: w.LoadParser,
    priority: At.Normal
  },
  test(s) {
    return ur.includes(re.extname(s).toLowerCase());
  },
  async testParse(s) {
    return ae.test(s) || Ae.test(s);
  },
  async parse(s, e, t) {
    const r = ae.test(s) ? ae.parse(s) : Ae.parse(s), { src: i } = e, { pages: n } = r, a = [];
    for (let l = 0; l < n.length; ++l) {
      const d = n[l].file;
      let u = re.join(re.dirname(i), d);
      u = Wt(u, i), a.push(u);
    }
    const o = await t.load(a), c = a.map((l) => o[l]);
    return new _t({
      data: r,
      textures: c
    }, i);
  },
  async load(s, e) {
    return await (await O.get().fetch(s)).text();
  },
  async unload(s, e, t) {
    await Promise.all(s.pages.map((r) => t.unload(r.texture.source._sourceOrigin))), s.destroy();
  }
}, gr = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `
    ),
    main: (
      /* wgsl */
      `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `
    ),
    end: (
      /* wgsl */
      `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `
    )
  },
  fragment: {
    header: (
      /* wgsl */
      `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `
    ),
    main: (
      /* wgsl */
      ` 
            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);
        `
    )
  }
}, mr = {
  name: "local-uniform-msdf-bit",
  vertex: {
    header: (
      /* glsl */
      `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `
    ),
    main: (
      /* glsl */
      `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `
    ),
    end: (
      /* glsl */
      `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `
    )
  },
  fragment: {
    header: (
      /* glsl */
      `
            uniform float uDistance;
         `
    ),
    main: (
      /* glsl */
      ` 
            outColor = vColor * calculateMSDFAlpha(outColor, uDistance);
        `
    )
  }
}, xr = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* wgsl */
      `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `
    )
  }
}, _r = {
  name: "msdf-bit",
  fragment: {
    header: (
      /* glsl */
      `
            float calculateMSDFAlpha(vec4 msdfColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `
    )
  }
};
class br extends $e {
  constructor() {
    const e = new X({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new H(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    }), t = Ke({
      name: "sdf-shader",
      bits: [
        Gt,
        Lt(ye),
        gr,
        xr,
        Ye
      ]
    }), r = Ve({
      name: "sdf-shader",
      bits: [
        Ot,
        Dt(ye),
        mr,
        _r,
        Xe
      ]
    });
    super({
      glProgram: r,
      gpuProgram: t,
      resources: {
        localUniforms: e,
        batchSamplers: Et
      }
    });
  }
}
class bt {
  constructor(e) {
    this._gpuBitmapText = {}, this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    return e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, t)), this._renderer.renderPipes.graphics.validateRenderable(t);
  }
  addRenderable(e, t) {
    const r = this._getGpuBitmapText(e);
    We(e, r), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, r)), this._renderer.renderPipes.graphics.addRenderable(r, t), r.context.customShader && this._updateDistanceField(e);
  }
  destroyRenderable(e) {
    this._destroyRenderableByUid(e.uid);
  }
  _destroyRenderableByUid(e) {
    P.return(this._gpuBitmapText[e]), this._gpuBitmapText[e] = null;
  }
  updateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    We(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
  }
  _updateContext(e, t) {
    var f;
    const { context: r } = t, i = ce.getFont(e.text, e._style);
    r.clear(), i.distanceField.type !== "none" && (r.customShader || (this._sdfShader || (this._sdfShader = new br()), r.customShader = this._sdfShader));
    const n = Array.from(e.text), a = e._style;
    let o = (((f = a._stroke) == null ? void 0 : f.width) || 0) / 2;
    o += i.baseLineOffset;
    const c = at(n, a, i);
    let h = 0;
    const l = a.padding, d = c.scale;
    r.translate(
      -e._anchor._x * c.width - l,
      -e._anchor._y * (c.height + c.offsetY) - l
    ).scale(d, d);
    const u = a._fill.color;
    for (let p = 0; p < c.lines.length; p++) {
      const m = c.lines[p];
      for (let x = 0; x < m.charPositions.length; x++) {
        const _ = n[h++], b = i.chars[_];
        b != null && b.texture && r.texture(
          b.texture,
          u || "black",
          Math.round(m.charPositions[x] + b.xOffset),
          Math.round(o + b.yOffset)
        );
      }
      o += i.lineHeight;
    }
  }
  _getGpuBitmapText(e) {
    return this._gpuBitmapText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = P.get(Ut);
    return this._gpuBitmapText[e.uid] = t, this._updateContext(e, t), e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), this._gpuBitmapText[e.uid];
  }
  _updateDistanceField(e) {
    const t = this._getGpuBitmapText(e).context, r = e._style.fontFamily, i = A.get(`${r}-bitmap`), { a: n, b: a, c: o, d: c } = e.groupTransform, h = Math.sqrt(n * n + a * a), l = Math.sqrt(o * o + c * c), d = (Math.abs(h) + Math.abs(l)) / 2, u = i.baseRenderedFontSize / e._style.fontSize, f = e.resolution ?? this._renderer.resolution, p = d * i.distanceField.range * (1 / u) * f;
    t.customShader.resources.localUniforms.uniforms.uDistance = p;
  }
  destroy() {
    var e;
    for (const t in this._gpuBitmapText)
      this._destroyRenderableByUid(t);
    this._gpuBitmapText = null, (e = this._sdfShader) == null || e.destroy(!0), this._sdfShader = null, this._renderer = null;
  }
}
bt.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "bitmapText"
};
function We(s, e) {
  e.groupTransform = s.groupTransform, e.groupColorAlpha = s.groupColorAlpha, e.groupColor = s.groupColor, e.groupBlendMode = s.groupBlendMode, e.globalDisplayStatus = s.globalDisplayStatus, e.groupTransform = s.groupTransform, e.localDisplayStatus = s.localDisplayStatus, e.groupAlpha = s.groupAlpha, e._roundPixels = s._roundPixels;
}
class St {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    return t.textureNeedsUploading ? (t.textureNeedsUploading = !1, !0) : t.currentKey !== r;
  }
  addRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), P.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e).catch((a) => {
      console.error(a);
    }), e._didTextUpdate = !1;
    const n = e._style.padding;
    oe(i.bounds, e._anchor, i.texture, n);
  }
  async _updateGpuText(e) {
    e._didTextUpdate = !1;
    const t = this._getGpuText(e);
    if (t.generatingTexture)
      return;
    const r = e._getKey();
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey), t.generatingTexture = !0, t.currentKey = r;
    const i = e.resolution ?? this._renderer.resolution, n = await this._renderer.htmlText.getManagedTexture(
      e.text,
      i,
      e._style,
      e._getKey()
    ), a = t.batchableSprite;
    a.texture = t.texture = n, t.generatingTexture = !1, t.textureNeedsUploading = !0, e.onViewUpdate();
    const o = e._style.padding;
    oe(a.bounds, e._anchor, a.texture, o);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: U.EMPTY,
      currentKey: "--",
      batchableSprite: P.get(je),
      textureNeedsUploading: !1,
      generatingTexture: !1
    }, r = t.batchableSprite;
    return r.renderable = e, r.texture = U.EMPTY, r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, r.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
St.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "htmlText"
};
function Sr() {
  const { userAgent: s } = O.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(s);
}
const wr = new Le();
function wt(s, e, t, r) {
  const i = wr;
  i.minX = 0, i.minY = 0, i.maxX = s.width / r | 0, i.maxY = s.height / r | 0;
  const n = I.getOptimalTexture(
    i.width,
    i.height,
    r,
    !1
  );
  return n.source.uploadMethodId = "image", n.source.resource = s, n.source.alphaMode = "premultiply-alpha-on-upload", n.frame.width = e / r, n.frame.height = t / r, n.source.emit("update", n.source), n.updateUvs(), n;
}
function yr(s, e) {
  const t = e.fontFamily, r = [], i = {}, n = /font-family:([^;"\s]+)/g, a = s.match(n);
  function o(c) {
    i[c] || (r.push(c), i[c] = !0);
  }
  if (Array.isArray(t))
    for (let c = 0; c < t.length; c++)
      o(t[c]);
  else
    o(t);
  a && a.forEach((c) => {
    const h = c.split(":")[1].trim();
    o(h);
  });
  for (const c in e.tagStyles) {
    const h = e.tagStyles[c].fontFamily;
    o(h);
  }
  return r;
}
async function Tr(s) {
  const t = await (await O.get().fetch(s)).blob(), r = new FileReader();
  return await new Promise((n, a) => {
    r.onloadend = () => n(r.result), r.onerror = a, r.readAsDataURL(t);
  });
}
async function Ue(s, e) {
  const t = await Tr(e);
  return `@font-face {
        font-family: "${s.fontFamily}";
        src: url('${t}');
        font-weight: ${s.fontWeight};
        font-style: ${s.fontStyle};
    }`;
}
const N = /* @__PURE__ */ new Map();
async function vr(s, e, t) {
  const r = s.filter((i) => A.has(`${i}-and-url`)).map((i, n) => {
    if (!N.has(i)) {
      const { url: a } = A.get(`${i}-and-url`);
      n === 0 ? N.set(i, Ue(e, a)) : N.set(i, Ue({
        fontWeight: t.fontWeight,
        fontStyle: t.fontStyle,
        fontFamily: i
      }, a));
    }
    return N.get(i);
  });
  return (await Promise.all(r)).join(`
`);
}
function Cr(s, e, t, r, i) {
  const { domElement: n, styleElement: a, svgRoot: o } = i;
  n.innerHTML = `<style>${e.cssStyle}</style><div>${s}</div>`, n.setAttribute("style", `transform: scale(${t});transform-origin: top left; display: inline-block`), a.textContent = r;
  const { width: c, height: h } = i.image;
  return o.setAttribute("width", c.toString()), o.setAttribute("height", h.toString()), new XMLSerializer().serializeToString(o);
}
function Br(s, e) {
  const t = D.getOptimalCanvasAndContext(
    s.width,
    s.height,
    e
  ), { context: r } = t;
  return r.clearRect(0, 0, s.width, s.height), r.drawImage(s, 0, 0), D.returnCanvasAndContext(t), t.canvas;
}
function Fr(s, e, t) {
  return new Promise(async (r) => {
    t && await new Promise((i) => setTimeout(i, 100)), s.onload = () => {
      r();
    }, s.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`, s.crossOrigin = "anonymous";
  });
}
class ge {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e, this._createCanvas = e.type === le.WEBGPU;
  }
  getTexture(e) {
    return this._buildTexturePromise(
      e.text,
      e.resolution,
      e.style
    );
  }
  getManagedTexture(e, t, r, i) {
    if (this._activeTextures[i])
      return this._increaseReferenceCount(i), this._activeTextures[i].promise;
    const n = this._buildTexturePromise(e, t, r).then((a) => (this._activeTextures[i].texture = a, a));
    return this._activeTextures[i] = {
      texture: null,
      promise: n,
      usageCount: 1
    }, n;
  }
  async _buildTexturePromise(e, t, r) {
    const i = P.get(lt), n = yr(e, r), a = await vr(
      n,
      r,
      fe.defaultTextStyle
    ), o = rr(e, r, a, i), c = Math.ceil(Math.ceil(Math.max(1, o.width) + r.padding * 2) * t), h = Math.ceil(Math.ceil(Math.max(1, o.height) + r.padding * 2) * t), l = i.image;
    l.width = c | 0, l.height = h | 0;
    const d = Cr(e, r, t, a, i);
    await Fr(l, d, Sr() && n.length > 0);
    let u = l;
    this._createCanvas && (u = Br(l, t));
    const f = wt(u, l.width, l.height, t);
    return this._createCanvas && this._renderer.texture.initSource(f.source), P.return(i), f;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    t && (t.usageCount--, t.usageCount === 0 && (t.texture ? this._cleanUp(t) : t.promise.then((r) => {
      t.texture = r, this._cleanUp(t);
    }).catch(() => {
      Y("HTMLTextSystem: Failed to clean texture");
    }), this._activeTextures[e] = null));
  }
  _cleanUp(e) {
    I.returnTexture(e.texture), e.texture.source.resource = null, e.texture.source.uploadMethodId = "unknown";
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
ge.extension = {
  type: [
    w.WebGLSystem,
    w.WebGPUSystem,
    w.CanvasSystem
  ],
  name: "htmlText"
};
ge.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal"
};
class yt {
  constructor(e) {
    this._gpuText = /* @__PURE__ */ Object.create(null), this._renderer = e;
  }
  validateRenderable(e) {
    const t = this._getGpuText(e), r = e._getKey();
    if (t.currentKey !== r) {
      const i = e.resolution ?? this._renderer.resolution, { width: n, height: a } = this._renderer.canvasText.getTextureSize(
        e.text,
        i,
        e._style
      );
      return (
        // is only being used by this text:
        !(this._renderer.canvasText.getReferenceCount(t.currentKey) === 1 && n === t.texture._source.width && a === t.texture._source.height)
      );
    }
    return !1;
  }
  addRenderable(e, t) {
    const i = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), this._renderer.renderPipes.batch.addToBatch(i);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.canvasText.decreaseReferenceCount(t.currentKey), P.return(t.batchableSprite), this._gpuText[e] = null;
  }
  _updateText(e) {
    const t = e._getKey(), r = this._getGpuText(e), i = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e), e._didTextUpdate = !1;
    const n = e._style.padding;
    oe(i.bounds, e._anchor, i.texture, n);
  }
  _updateGpuText(e) {
    const t = this._getGpuText(e), r = t.batchableSprite;
    t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey), t.texture = r.texture = this._renderer.canvasText.getManagedTexture(e), t.currentKey = e._getKey(), r.texture = t.texture;
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
      texture: null,
      currentKey: "--",
      batchableSprite: P.get(je)
    };
    return t.batchableSprite.renderable = e, t.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, t.batchableSprite.roundPixels = this._renderer._roundPixels | e._roundPixels, this._gpuText[e.uid] = t, this._updateText(e), e.on("destroyed", () => {
      this.destroyRenderable(e);
    }), t;
  }
  destroy() {
    for (const e in this._gpuText)
      this._destroyRenderableById(e);
    this._gpuText = null, this._renderer = null;
  }
}
yt.extension = {
  type: [
    w.WebGLPipes,
    w.WebGPUPipes,
    w.CanvasPipes
  ],
  name: "text"
};
function ze(s, e, t) {
  for (let r = 0, i = 4 * t * e; r < e; ++r, i += 4)
    if (s[i + 3] !== 0)
      return !1;
  return !0;
}
function Ie(s, e, t, r, i) {
  const n = 4 * e;
  for (let a = r, o = r * n + 4 * t; a <= i; ++a, o += n)
    if (s[o + 3] !== 0)
      return !1;
  return !0;
}
function Pr(s, e = 1) {
  const { width: t, height: r } = s, i = s.getContext("2d", {
    willReadFrequently: !0
  });
  if (i === null)
    throw new TypeError("Failed to get canvas 2D context");
  const a = i.getImageData(0, 0, t, r).data;
  let o = 0, c = 0, h = t - 1, l = r - 1;
  for (; c < r && ze(a, t, c); )
    ++c;
  if (c === r)
    return q.EMPTY;
  for (; ze(a, t, l); )
    --l;
  for (; Ie(a, t, o, c, l); )
    ++o;
  for (; Ie(a, t, h, c, l); )
    --h;
  return ++h, ++l, new q(o / e, c / e, (h - o) / e, (l - c) / e);
}
class Tt {
  constructor(e) {
    this._activeTextures = {}, this._renderer = e;
  }
  getTextureSize(e, t, r) {
    const i = L.measureText(e || " ", r);
    let n = Math.ceil(Math.ceil(Math.max(1, i.width) + r.padding * 2) * t), a = Math.ceil(Math.ceil(Math.max(1, i.height) + r.padding * 2) * t);
    return n = Math.ceil(n - 1e-6), a = Math.ceil(a - 1e-6), n = Te(n), a = Te(a), { width: n, height: a };
  }
  getTexture(e, t, r, i) {
    typeof e == "string" && (R("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), e = {
      text: e,
      style: r,
      resolution: t
    }), e.style instanceof V || (e.style = new V(e.style));
    const { texture: n, canvasAndContext: a } = this.createTextureAndCanvas(
      e
    );
    return this._renderer.texture.initSource(n._source), D.returnCanvasAndContext(a), n;
  }
  createTextureAndCanvas(e) {
    const { text: t, style: r } = e, i = e.resolution ?? this._renderer.resolution, n = L.measureText(t || " ", r), a = Math.ceil(Math.ceil(Math.max(1, n.width) + r.padding * 2) * i), o = Math.ceil(Math.ceil(Math.max(1, n.height) + r.padding * 2) * i), c = D.getOptimalCanvasAndContext(a, o), { canvas: h } = c;
    this.renderTextToCanvas(t, r, i, c);
    const l = wt(h, a, o, i);
    if (r.trim) {
      const d = Pr(h, i);
      l.frame.copyFrom(d), l.updateUvs();
    }
    return { texture: l, canvasAndContext: c };
  }
  getManagedTexture(e) {
    const t = e._getKey();
    if (this._activeTextures[t])
      return this._increaseReferenceCount(t), this._activeTextures[t].texture;
    const { texture: r, canvasAndContext: i } = this.createTextureAndCanvas(e);
    return this._activeTextures[t] = {
      canvasAndContext: i,
      texture: r,
      usageCount: 1
    }, r;
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    if (t.usageCount--, t.usageCount === 0) {
      D.returnCanvasAndContext(t.canvasAndContext), I.returnTexture(t.texture);
      const r = t.texture.source;
      r.resource = null, r.uploadMethodId = "unknown", r.alphaMode = "no-premultiply-alpha", this._activeTextures[e] = null;
    }
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(e, t, r, i) {
    var S, y, T, B, v;
    const { canvas: n, context: a } = i, o = J(t), c = L.measureText(e || " ", t), h = c.lines, l = c.lineHeight, d = c.lineWidths, u = c.maxLineWidth, f = c.fontProperties, p = n.height;
    a.resetTransform(), a.scale(r, r);
    const m = t.padding * 2;
    if (a.clearRect(0, 0, c.width + 4 + m, c.height + 4 + m), (S = t._stroke) != null && S.width) {
      const C = t._stroke;
      a.lineWidth = C.width, a.miterLimit = C.miterLimit, a.lineJoin = C.join, a.lineCap = C.cap;
    }
    a.font = o;
    let x, _;
    const b = t.dropShadow ? 2 : 1;
    for (let C = 0; C < b; ++C) {
      const k = t.dropShadow && C === 0, E = k ? Math.ceil(Math.max(1, p) + t.padding * 2) : 0, Z = E * r;
      if (k) {
        a.fillStyle = "black", a.strokeStyle = "black";
        const F = t.dropShadow, vt = F.color, Ct = F.alpha;
        a.shadowColor = G.shared.setValue(vt).setAlpha(Ct).toRgbaString();
        const Bt = F.blur * r, _e = F.distance * r;
        a.shadowBlur = Bt, a.shadowOffsetX = Math.cos(F.angle) * _e, a.shadowOffsetY = Math.sin(F.angle) * _e + Z;
      } else
        a.globalAlpha = ((y = t._fill) == null ? void 0 : y.alpha) ?? 1, a.fillStyle = t._fill ? Q(t._fill, a) : null, (T = t._stroke) != null && T.width && (a.strokeStyle = Q(t._stroke, a)), a.shadowColor = "black";
      let me = (l - f.fontSize) / 2;
      l - f.fontSize < 0 && (me = 0);
      const xe = ((B = t._stroke) == null ? void 0 : B.width) ?? 0;
      for (let F = 0; F < h.length; F++)
        x = xe / 2, _ = xe / 2 + F * l + f.ascent + me, t.align === "right" ? x += u - d[F] : t.align === "center" && (x += (u - d[F]) / 2), (v = t._stroke) != null && v.width && this._drawLetterSpacing(
          h[F],
          t,
          i,
          x + t.padding,
          _ + t.padding - E,
          !0
        ), t._fill !== void 0 && this._drawLetterSpacing(
          h[F],
          t,
          i,
          x + t.padding,
          _ + t.padding - E
        );
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(e, t, r, i, n, a = !1) {
    const { context: o } = r, c = t.letterSpacing;
    let h = !1;
    if (L.experimentalLetterSpacingSupported && (L.experimentalLetterSpacing ? (o.letterSpacing = `${c}px`, o.textLetterSpacing = `${c}px`, h = !0) : (o.letterSpacing = "0px", o.textLetterSpacing = "0px")), c === 0 || h) {
      a ? o.strokeText(e, i, n) : o.fillText(e, i, n);
      return;
    }
    let l = i;
    const d = L.graphemeSegmenter(e);
    let u = o.measureText(e).width, f = 0;
    for (let p = 0; p < d.length; ++p) {
      const m = d[p];
      a ? o.strokeText(m, l, n) : o.fillText(m, l, n);
      let x = "";
      for (let _ = p + 1; _ < d.length; ++_)
        x += d[_];
      f = o.measureText(x).width, l += u - f + c, u = f;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
Tt.extension = {
  type: [
    w.WebGLSystem,
    w.WebGPUSystem,
    w.CanvasSystem
  ],
  name: "canvasText"
};
M.add(Ne);
M.add(qe);
M.add(ht);
M.add(zt);
M.add(ft);
M.add(Tt);
M.add(yt);
M.add(bt, pr, fr);
M.add(ge);
M.add(St);
M.add(xt);
M.add(mt);
M.add(Ze);
M.add(Je);
//# sourceMappingURL=init-BdRJrnWw.js.map
