var e = 1e3, t = 1001, n = 1002, r = 1003, i = 1004, a = 1005, o = 1006, s = 1007, c = 1008, l = 1009, u = 1015, d = 2300, f = 2301, p = 2302, m = 2303, h = 2400, g = 2401, _ = 2402, v = "srgb", y = "srgb-linear", b = "linear", x = 7680, S = 2e3;
function C(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function w(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function T(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
var E = {};
function D(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function O(...e) {
	e = D(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function k(...e) {
	e = D(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function A(...e) {
	let t = e.join(" ");
	t in E || (E[t] = !0, O(...e));
}
var ee = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n !== void 0 && n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, j = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), M = 1234567, N = Math.PI / 180, te = 180 / Math.PI;
function P() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (j[e & 255] + j[e >> 8 & 255] + j[e >> 16 & 255] + j[e >> 24 & 255] + "-" + j[t & 255] + j[t >> 8 & 255] + "-" + j[t >> 16 & 15 | 64] + j[t >> 24 & 255] + "-" + j[n & 63 | 128] + j[n >> 8 & 255] + "-" + j[n >> 16 & 255] + j[n >> 24 & 255] + j[r & 255] + j[r >> 8 & 255] + j[r >> 16 & 255] + j[r >> 24 & 255]).toLowerCase();
}
function F(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function ne(e, t) {
	return (e % t + t) % t;
}
function re(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function ie(e, t, n) {
	return e === t ? 0 : (n - e) / (t - e);
}
function ae(e, t, n) {
	return (1 - n) * e + n * t;
}
function oe(e, t, n, r) {
	return ae(e, t, 1 - Math.exp(-n * r));
}
function se(e, t = 1) {
	return t - Math.abs(ne(e, t * 2) - t);
}
function ce(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function le(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function ue(e, t) {
	return e + Math.floor(Math.random() * (t - e + 1));
}
function de(e, t) {
	return e + Math.random() * (t - e);
}
function fe(e) {
	return e * (.5 - Math.random());
}
function pe(e) {
	e !== void 0 && (M = e);
	let t = M += 1831565813;
	return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function me(e) {
	return e * N;
}
function he(e) {
	return e * te;
}
function ge(e) {
	return e > 0 && Number.isInteger(e) && 2 ** Math.round(Math.log2(e)) === e;
}
function _e(e) {
	return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function ve(e) {
	return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function ye(e, t, n, r, i) {
	let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2);
	switch (i) {
		case "XYX":
			e.set(s * u, c * d, c * f, s * l);
			break;
		case "YZY":
			e.set(c * f, s * u, c * d, s * l);
			break;
		case "ZXZ":
			e.set(c * d, c * f, s * u, s * l);
			break;
		case "XZX":
			e.set(s * u, c * m, c * p, s * l);
			break;
		case "YXY":
			e.set(c * p, s * u, c * m, s * l);
			break;
		case "ZYZ":
			e.set(c * m, c * p, s * u, s * l);
			break;
		default: O("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
	}
}
function be(e) {
	switch (e.constructor) {
		case Uint32Array: return 4294967295;
		case Uint16Array: return 65535;
		case Uint8Array:
		case Uint8ClampedArray: return 255;
		case Int32Array: return 2147483647;
		case Int16Array: return 32767;
		case Int8Array: return 127;
		default: return;
	}
}
function xe(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = be(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.max(e / n, -1);
}
function Se(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = be(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.round(e * n);
}
var Ce = {
	DEG2RAD: N,
	RAD2DEG: te,
	generateUUID: P,
	clamp: F,
	euclideanModulo: ne,
	mapLinear: re,
	inverseLerp: ie,
	lerp: ae,
	damp: oe,
	pingpong: se,
	smoothstep: ce,
	smootherstep: le,
	randInt: ue,
	randFloat: de,
	randFloatSpread: fe,
	seededRandom: pe,
	degToRad: me,
	radToDeg: he,
	isPowerOfTwo: ge,
	ceilPowerOfTwo: _e,
	floorPowerOfTwo: ve,
	setQuaternionFromProperEuler: ye,
	normalize: Se,
	denormalize: xe
}, I = class {
	static {
		this.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = F(this.x, e.x, t.x), this.y = F(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = F(this.x, e, t), this.y = F(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(F(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(F(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, we = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: O("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(F(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, L = class {
	static {
		this.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(Ee.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(Ee.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = F(this.x, e.x, t.x), this.y = F(this.y, e.y, t.y), this.z = F(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = F(this.x, e, t), this.y = F(this.y, e, t), this.z = F(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(F(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return Te.copy(this).projectOnVector(e), this.sub(Te);
	}
	reflect(e) {
		return this.sub(Te.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(F(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, Te = /*@__PURE__*/ new L(), Ee = /*@__PURE__*/ new we(), De = class {
	static {
		this.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return A("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Oe.makeScale(e, t)), this;
	}
	rotate(e) {
		return A("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Oe.makeRotation(-e)), this;
	}
	translate(e, t) {
		return A("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Oe.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, Oe = /*@__PURE__*/ new De(), ke = /*@__PURE__*/ new De().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Ae = /*@__PURE__*/ new De().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function je() {
	let e = {
		enabled: !0,
		workingColorSpace: y,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n || (this.spaces[t].transfer === "srgb" && (e.r = Ne(e.r), e.g = Ne(e.g), e.b = Ne(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = Pe(e.r), e.g = Pe(e.g), e.b = Pe(e.b))), e;
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? b : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[y]: {
			primaries: t,
			whitePoint: r,
			transfer: b,
			toXYZ: ke,
			fromXYZ: Ae,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: v },
			outputColorSpaceConfig: { drawingBufferColorSpace: v }
		},
		[v]: {
			primaries: t,
			whitePoint: r,
			transfer: "srgb",
			toXYZ: ke,
			fromXYZ: Ae,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: v }
		}
	}), e;
}
var Me = /*@__PURE__*/ je();
function Ne(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function Pe(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var Fe, Ie = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			Fe === void 0 && (Fe = T("canvas")), Fe.width = e.width, Fe.height = e.height;
			let t = Fe.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = Fe;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = T("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = Ne(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		}
		if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(Ne(t[e] / 255) * 255) : t[e] = Ne(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		}
		return O("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, Le = 0, Re = class {
	constructor(e = null) {
		this.isTextureSource = !0, Object.defineProperty(this, "id", { value: Le++ }), this.uuid = P(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width || 0, t.height || 0, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(ze(r[t].image)) : e.push(ze(r[t]));
			} else e = ze(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function ze(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Ie.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (O("Texture: Unable to serialize Texture."), {});
}
var Be = 0, Ve = /*@__PURE__*/ new L(), He = class r extends ee {
	constructor(e = r.DEFAULT_IMAGE, n = r.DEFAULT_MAPPING, i = t, a = t, s = o, u = c, d = 1023, f = l, p = r.DEFAULT_ANISOTROPY, m = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Be++ }), this.uuid = P(), this.name = "", this.source = new Re(e), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = a, this.magFilter = s, this.minFilter = u, this.anisotropy = p, this.format = d, this.internalFormat = null, this.type = f, this.offset = new I(0, 0), this.repeat = new I(1, 1), this.center = new I(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.mipmapsAutoUpdate = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = m, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.isPMREMTexture = !1, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(Ve).x;
	}
	get height() {
		return this.source.getSize(Ve).y;
	}
	get depth() {
		return this.source.getSize(Ve).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.mipmapsAutoUpdate = e.mipmapsAutoUpdate, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isPMREMTexture = e.isPMREMTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				O(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? O(`Texture.setValues(): property '${t}' does not exist.`) : r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			mipmapsAutoUpdate: this.mipmapsAutoUpdate,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(r) {
		if (this.mapping !== 300) return r;
		if (r.applyMatrix3(this.matrix), r.x < 0 || r.x > 1) switch (this.wrapS) {
			case e:
				r.x -= Math.floor(r.x);
				break;
			case t:
				r.x = r.x < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.x) % 2) === 1 ? r.x = Math.ceil(r.x) - r.x : r.x -= Math.floor(r.x);
		}
		if (r.y < 0 || r.y > 1) switch (this.wrapT) {
			case e:
				r.y -= Math.floor(r.y);
				break;
			case t:
				r.y = r.y < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.y) % 2) === 1 ? r.y = Math.ceil(r.y) - r.y : r.y -= Math.floor(r.y);
		}
		return this.flipY && (r.y = 1 - r.y), r;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
He.DEFAULT_IMAGE = null, He.DEFAULT_MAPPING = 300, He.DEFAULT_ANISOTROPY = 1;
var Ue = class {
	static {
		this.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = F(this.x, e.x, t.x), this.y = F(this.y, e.y, t.y), this.z = F(this.z, e.z, t.z), this.w = F(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = F(this.x, e, t), this.y = F(this.y, e, t), this.z = F(this.z, e, t), this.w = F(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(F(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, We = class e {
	static {
		this.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / Ge.setFromMatrixColumn(e, 0).length(), i = 1 / Ge.setFromMatrixColumn(e, 1).length(), a = 1 / Ge.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(qe, e, Je);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return Ze.subVectors(e, t), Ze.lengthSq() === 0 && (Ze.z = 1), Ze.normalize(), Ye.crossVectors(n, Ze), Ye.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ze.x += 1e-4 : Ze.z += 1e-4, Ze.normalize(), Ye.crossVectors(n, Ze)), Ye.normalize(), Xe.crossVectors(Ze, Ye), r[0] = Ye.x, r[4] = Xe.x, r[8] = Ze.x, r[1] = Ye.y, r[5] = Xe.y, r[9] = Ze.y, r[2] = Ye.z, r[6] = Xe.z, r[10] = Ze.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], ee = r[10], j = r[14], M = r[3], N = r[7], te = r[11], P = r[15];
		return i[0] = a * x + o * T + s * k + c * M, i[4] = a * S + o * E + s * A + c * N, i[8] = a * C + o * D + s * ee + c * te, i[12] = a * w + o * O + s * j + c * P, i[1] = l * x + u * T + d * k + f * M, i[5] = l * S + u * E + d * A + f * N, i[9] = l * C + u * D + d * ee + f * te, i[13] = l * w + u * O + d * j + f * P, i[2] = p * x + m * T + h * k + g * M, i[6] = p * S + m * E + h * A + g * N, i[10] = p * C + m * D + h * ee + g * te, i[14] = p * w + m * O + h * j + g * P, i[3] = _ * x + v * T + y * k + b * M, i[7] = _ * S + v * E + y * A + b * N, i[11] = _ * C + v * D + y * ee + b * te, i[15] = _ * w + v * O + y * j + b * P, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = Ge.set(r[0], r[1], r[2]).length(), o = Ge.set(r[4], r[5], r[6]).length(), s = Ge.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), Ke.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return Ke.elements[0] *= c, Ke.elements[1] *= c, Ke.elements[2] *= c, Ke.elements[4] *= l, Ke.elements[5] *= l, Ke.elements[6] *= l, Ke.elements[8] *= u, Ke.elements[9] *= u, Ke.elements[10] *= u, t.setFromRotationMatrix(Ke), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = S, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = S, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, Ge = /*@__PURE__*/ new L(), Ke = /*@__PURE__*/ new We(), qe = /*@__PURE__*/ new L(0, 0, 0), Je = /*@__PURE__*/ new L(1, 1, 1), Ye = /*@__PURE__*/ new L(), Xe = /*@__PURE__*/ new L(), Ze = /*@__PURE__*/ new L(), Qe = /*@__PURE__*/ new We(), $e = /*@__PURE__*/ new we(), et = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(F(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-F(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(F(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-F(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(F(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-F(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: O("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return Qe.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Qe, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return $e.setFromEuler(this), this.setFromQuaternion($e, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
et.DEFAULT_ORDER = "XYZ";
var tt = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = 1 << e >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e;
	}
	disable(e) {
		this.mask &= ~(1 << e);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return !!(this.mask & 1 << e);
	}
}, nt = 0, rt = /*@__PURE__*/ new L(), it = /*@__PURE__*/ new we(), at = /*@__PURE__*/ new We(), ot = /*@__PURE__*/ new L(), st = /*@__PURE__*/ new L(), ct = /*@__PURE__*/ new L(), lt = /*@__PURE__*/ new we(), ut = /*@__PURE__*/ new L(1, 0, 0), dt = /*@__PURE__*/ new L(0, 1, 0), ft = /*@__PURE__*/ new L(0, 0, 1), pt = { type: "added" }, mt = { type: "removed" }, ht = {
	type: "childadded",
	child: null
}, gt = {
	type: "childremoved",
	child: null
}, _t = class e extends ee {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: nt++ }), this.uuid = P(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new L(), n = new et(), r = new we(), i = new L(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new We() },
			normalMatrix: { value: new De() }
		}), this.matrix = new We(), this.matrixWorld = new We(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new tt(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale), this.pivot !== null && this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return it.setFromAxisAngle(e, t), this.quaternion.multiply(it), this;
	}
	rotateOnWorldAxis(e, t) {
		return it.setFromAxisAngle(e, t), this.quaternion.premultiply(it), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(ut, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(dt, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(ft, e);
	}
	translateOnAxis(e, t) {
		return rt.copy(e).applyQuaternion(this.quaternion), this.position.add(rt.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(ut, e);
	}
	translateY(e) {
		return this.translateOnAxis(dt, e);
	}
	translateZ(e) {
		return this.translateOnAxis(ft, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(at.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? ot.copy(e) : ot.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), st.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? at.lookAt(st, ot, this.up) : at.lookAt(ot, st, this.up), this.quaternion.setFromRotationMatrix(at), r && (at.extractRotation(r.matrixWorld), it.setFromRotationMatrix(at), this.quaternion.premultiply(it.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (k("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(pt), ht.child = e, this.dispatchEvent(ht), ht.child = null) : k("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(mt), gt.child = e, this.dispatchEvent(gt), gt.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), at.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), at.multiply(e.parent.matrixWorld)), e.applyMatrix4(at), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(pt), ht.child = e, this.dispatchEvent(ht), ht.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(st, e, ct), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(st, lt, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	intersectsFrustum() {
		return !0;
	}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) {
			if (Array.isArray(this.material)) {
				let t = [];
				for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
				r.material = t;
			} else r.material = i(e.materials, this.material);
		}
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
};
_t.DEFAULT_UP = /*@__PURE__*/ new L(0, 1, 0), _t.DEFAULT_MATRIX_AUTO_UPDATE = !0, _t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var R = class extends _t {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, vt = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, yt = {
	h: 0,
	s: 0,
	l: 0
}, bt = {
	h: 0,
	s: 0,
	l: 0
};
function xt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var St = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = v) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Me.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = Me.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, Me.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = Me.workingColorSpace) {
		if (e = ne(e, 1), t = F(t, 0, 1), n = F(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = xt(i, r, e + 1 / 3), this.g = xt(i, r, e), this.b = xt(i, r, e - 1 / 3);
		}
		return Me.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = v) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && O("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseFloat(i[1])) / 100, Math.min(100, parseFloat(i[2])) / 100, Math.min(100, parseFloat(i[3])) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: O("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			O("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = v) {
		let n = vt[e.toLowerCase()];
		return n === void 0 ? O("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = Ne(e.r), this.g = Ne(e.g), this.b = Ne(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = Pe(e.r), this.g = Pe(e.g), this.b = Pe(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = v) {
		return Me.workingToColorSpace(Ct.copy(this), e), Math.round(F(Ct.r * 255, 0, 255)) * 65536 + Math.round(F(Ct.g * 255, 0, 255)) * 256 + Math.round(F(Ct.b * 255, 0, 255));
	}
	getHexString(e = v) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = Me.workingColorSpace) {
		Me.workingToColorSpace(Ct.copy(this), t);
		let n = Ct.r, r = Ct.g, i = Ct.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i: s = (n - r) / e + 4;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = Me.workingColorSpace) {
		return Me.workingToColorSpace(Ct.copy(this), t), e.r = Ct.r, e.g = Ct.g, e.b = Ct.b, e;
	}
	getStyle(e = v) {
		Me.workingToColorSpace(Ct.copy(this), e);
		let t = Ct.r, n = Ct.g, r = Ct.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(yt), this.setHSL(yt.h + e, yt.s + t, yt.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(yt), e.getHSL(bt);
		let n = ae(yt.h, bt.h, t), r = ae(yt.s, bt.s, t), i = ae(yt.l, bt.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, Ct = /*@__PURE__*/ new St();
St.NAMES = vt;
var wt = class extends _t {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new et(), this.environmentIntensity = 1, this.environmentRotation = new et(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), this.background = e.background === null ? null : e.background.clone(), this.environment = e.environment === null ? null : e.environment.clone(), this.fog = e.fog === null ? null : e.fog.clone(), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), this.overrideMaterial = e.overrideMaterial === null ? null : e.overrideMaterial.clone(), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, Tt = /*@__PURE__*/ new L(), Et = /*@__PURE__*/ new L(), Dt = /*@__PURE__*/ new L(), Ot = /*@__PURE__*/ new L(), kt = /*@__PURE__*/ new L(), At = /*@__PURE__*/ new L(), jt = /*@__PURE__*/ new L(), Mt = /*@__PURE__*/ new L(), Nt = /*@__PURE__*/ new L(), Pt = /*@__PURE__*/ new L(), Ft = /*@__PURE__*/ new Ue(), It = /*@__PURE__*/ new Ue(), Lt = /*@__PURE__*/ new Ue(), Rt = class e {
	constructor(e = new L(), t = new L(), n = new L()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), Tt.subVectors(e, t), r.cross(Tt);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		Tt.subVectors(r, t), Et.subVectors(n, t), Dt.subVectors(e, t);
		let a = Tt.dot(Tt), o = Tt.dot(Et), s = Tt.dot(Dt), c = Et.dot(Et), l = Et.dot(Dt), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, Ot) !== null && Ot.x >= 0 && Ot.y >= 0 && Ot.x + Ot.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, Ot) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Ot.x), s.addScaledVector(a, Ot.y), s.addScaledVector(o, Ot.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return Ft.setScalar(0), It.setScalar(0), Lt.setScalar(0), Ft.fromBufferAttribute(e, t), It.fromBufferAttribute(e, n), Lt.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Ft, i.x), a.addScaledVector(It, i.y), a.addScaledVector(Lt, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return Tt.subVectors(n, t), Et.subVectors(e, t), Tt.cross(Et).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return Tt.subVectors(this.c, this.b), Et.subVectors(this.a, this.b), Tt.cross(Et).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		kt.subVectors(r, n), At.subVectors(i, n), Mt.subVectors(e, n);
		let s = kt.dot(Mt), c = At.dot(Mt);
		if (s <= 0 && c <= 0) return t.copy(n);
		Nt.subVectors(e, r);
		let l = kt.dot(Nt), u = At.dot(Nt);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0 && s - l > 0) return a = s / (s - l), t.copy(n).addScaledVector(kt, a);
		Pt.subVectors(e, i);
		let f = kt.dot(Pt), p = At.dot(Pt);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(At, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return jt.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(jt, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(kt, a).addScaledVector(At, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, zt = class {
	constructor(e = new L(Infinity, Infinity, Infinity), t = new L(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Vt.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Vt.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = Vt.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0 && e.isBatchedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, Vt) : Vt.fromBufferAttribute(r, t), Vt.applyMatrix4(e.matrixWorld), this.expandByPoint(Vt);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), Ht.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), Ht.copy(e.boundingBox)), Ht.applyMatrix4(e.matrixWorld), this.union(Ht);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, Vt), Vt.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(Yt), Xt.subVectors(this.max, Yt), Ut.subVectors(e.a, Yt), Wt.subVectors(e.b, Yt), Gt.subVectors(e.c, Yt), Kt.subVectors(Wt, Ut), qt.subVectors(Gt, Wt), Jt.subVectors(Ut, Gt);
		let t = [
			0,
			-Kt.z,
			Kt.y,
			0,
			-qt.z,
			qt.y,
			0,
			-Jt.z,
			Jt.y,
			Kt.z,
			0,
			-Kt.x,
			qt.z,
			0,
			-qt.x,
			Jt.z,
			0,
			-Jt.x,
			-Kt.y,
			Kt.x,
			0,
			-qt.y,
			qt.x,
			0,
			-Jt.y,
			Jt.x,
			0
		];
		return !$t(t, Ut, Wt, Gt, Xt) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !$t(t, Ut, Wt, Gt, Xt)) ? !1 : (Zt.crossVectors(Kt, qt), t = [
			Zt.x,
			Zt.y,
			Zt.z
		], $t(t, Ut, Wt, Gt, Xt));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, Vt).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Vt).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() || (Bt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Bt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Bt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Bt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Bt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Bt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Bt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Bt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Bt)), this;
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, Bt = [
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L(),
	/*@__PURE__*/ new L()
], Vt = /*@__PURE__*/ new L(), Ht = /*@__PURE__*/ new zt(), Ut = /*@__PURE__*/ new L(), Wt = /*@__PURE__*/ new L(), Gt = /*@__PURE__*/ new L(), Kt = /*@__PURE__*/ new L(), qt = /*@__PURE__*/ new L(), Jt = /*@__PURE__*/ new L(), Yt = /*@__PURE__*/ new L(), Xt = /*@__PURE__*/ new L(), Zt = /*@__PURE__*/ new L(), Qt = /*@__PURE__*/ new L();
function $t(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		Qt.fromArray(e, a);
		let o = i.x * Math.abs(Qt.x) + i.y * Math.abs(Qt.y) + i.z * Math.abs(Qt.z), s = t.dot(Qt), c = n.dot(Qt), l = r.dot(Qt);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var en = /*@__PURE__*/ new L(), tn = /*@__PURE__*/ new I(), nn = 0, rn = class extends ee {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: nn++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = u, this.version = 0, this._normalizationScale = e === void 0 ? void 0 : be(e);
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this._normalizationScale = e._normalizationScale, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) tn.fromBufferAttribute(this, t), tn.applyMatrix3(e), this.setXY(t, tn.x, tn.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) en.fromBufferAttribute(this, t), en.applyMatrix3(e), this.setXYZ(t, en.x, en.y, en.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) en.fromBufferAttribute(this, t), en.applyMatrix4(e), this.setXYZ(t, en.x, en.y, en.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) en.fromBufferAttribute(this, t), en.applyNormalMatrix(e), this.setXYZ(t, en.x, en.y, en.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) en.fromBufferAttribute(this, t), en.transformDirection(e), this.setXYZ(t, en.x, en.y, en.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? xe(e, this.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Se(e, this.array) : Math.round(e * t);
	}
}, an = class extends rn {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, on = class extends rn {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, z = class extends rn {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, sn = /*@__PURE__*/ new zt(), cn = /*@__PURE__*/ new L(), ln = /*@__PURE__*/ new L(), un = class {
	constructor(e = new L(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? sn.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		cn.subVectors(e, this.center);
		let t = cn.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(cn, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (ln.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(cn.copy(e.center).add(ln)), this.expandByPoint(cn.copy(e.center).sub(ln))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, dn = 0, fn = /*@__PURE__*/ new We(), pn = /*@__PURE__*/ new _t(), mn = /*@__PURE__*/ new L(), hn = /*@__PURE__*/ new zt(), gn = /*@__PURE__*/ new zt(), _n = /*@__PURE__*/ new L(), vn = class e extends ee {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: dn++ }), this.uuid = P(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return this.index = Array.isArray(e) ? new (C(e) ? on : an)(e, 1) : e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new De().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return fn.makeRotationFromQuaternion(e), this.applyMatrix4(fn), this;
	}
	rotateX(e) {
		return fn.makeRotationX(e), this.applyMatrix4(fn), this;
	}
	rotateY(e) {
		return fn.makeRotationY(e), this.applyMatrix4(fn), this;
	}
	rotateZ(e) {
		return fn.makeRotationZ(e), this.applyMatrix4(fn), this;
	}
	translate(e, t, n) {
		return fn.makeTranslation(e, t, n), this.applyMatrix4(fn), this;
	}
	scale(e, t, n) {
		return fn.makeScale(e, t, n), this.applyMatrix4(fn), this;
	}
	lookAt(e) {
		return pn.lookAt(e), pn.updateMatrix(), this.applyMatrix4(pn.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(mn).negate(), this.translate(mn.x, mn.y, mn.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new z(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && O("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new zt());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) k("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new L(-Infinity, -Infinity, -Infinity), new L(Infinity, Infinity, Infinity));
		else {
			if (e !== void 0) {
				if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
					let n = t[e];
					hn.setFromBufferAttribute(n), this.morphTargetsRelative ? (_n.addVectors(this.boundingBox.min, hn.min), this.boundingBox.expandByPoint(_n), _n.addVectors(this.boundingBox.max, hn.max), this.boundingBox.expandByPoint(_n)) : (this.boundingBox.expandByPoint(hn.min), this.boundingBox.expandByPoint(hn.max));
				}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && k("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new un());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) k("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new L(), Infinity);
		else if (e) {
			let n = this.boundingSphere.center;
			if (hn.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				gn.setFromBufferAttribute(n), this.morphTargetsRelative ? (_n.addVectors(hn.min, gn.min), hn.expandByPoint(_n), _n.addVectors(hn.max, gn.max), hn.expandByPoint(_n)) : (hn.expandByPoint(gn.min), hn.expandByPoint(gn.max));
			}
			hn.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) _n.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(_n));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) _n.fromBufferAttribute(a, t), o && (mn.fromBufferAttribute(e, t), _n.add(mn)), r = Math.max(r, n.distanceToSquared(_n));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && k("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			k("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new rn(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [], c = new Uint8Array(n.count);
		for (let e = 0; e < n.count; e++) o[e] = new L(), s[e] = new L();
		let l = new L(), u = new L(), d = new L(), f = new I(), p = new I(), m = new I(), h = new L(), g = new L();
		function _(e, t, r) {
			c[e] = c[t] = c[r] = 1, l.fromBufferAttribute(n, e), u.fromBufferAttribute(n, t), d.fromBufferAttribute(n, r), f.fromBufferAttribute(i, e), p.fromBufferAttribute(i, t), m.fromBufferAttribute(i, r), u.sub(l), d.sub(l), p.sub(f), m.sub(f);
			let a = 1 / (p.x * m.y - m.x * p.y);
			isFinite(a) && (h.copy(u).multiplyScalar(m.y).addScaledVector(d, -p.y).multiplyScalar(a), g.copy(d).multiplyScalar(p.x).addScaledVector(u, -m.x).multiplyScalar(a), o[e].add(h), o[t].add(h), o[r].add(h), s[e].add(g), s[t].add(g), s[r].add(g));
		}
		let v = this.groups;
		v.length === 0 && (v = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = v.length; t < n; ++t) {
			let n = v[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) _(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let y = new L(), b = new L(), x = new L(), S = new L();
		function C(e) {
			x.fromBufferAttribute(r, e), S.copy(x);
			let t = o[e];
			y.copy(t), y.sub(x.multiplyScalar(x.dot(t))).normalize(), b.crossVectors(S, t);
			let n = b.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, y.x, y.y, y.z, n);
		}
		for (let e = 0, t = n.count; e < t; ++e) c[e] && C(e);
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new rn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new L(), i = new L(), a = new L(), o = new L(), s = new L(), c = new L(), l = new L(), u = new L();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) _n.fromBufferAttribute(e, t), _n.normalize(), e.setXYZ(t, _n.x, _n.y, _n.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new rn(a, r, i);
		}
		if (this.index === null) return O("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, yn = /*@__PURE__*/ new L(), bn = /*@__PURE__*/ new L(), xn = /*@__PURE__*/ new De(), Sn = class {
	constructor(e = new L(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = yn.subVectors(n, t).cross(bn.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(yn), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || xn.getNormalMatrix(e), r = this.coplanarPoint(yn).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			normal: this.normal.toArray(),
			constant: this.constant
		};
	}
	fromJSON(e) {
		return this.normal.fromArray(e.normal), this.constant = e.constant, this;
	}
}, Cn = 0, wn = class extends ee {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Cn++ }), this.uuid = P(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new St(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = x, this.stencilZFail = x, this.stencilZPass = x, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				O(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? O(`Material: '${t}' is not a property of THREE.${this.type}.`) : r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.diffuseRoughness !== void 0 && (n.diffuseRoughness = this.diffuseRoughness), this.diffuseRoughnessMap && this.diffuseRoughnessMap.isTexture && (n.diffuseRoughnessMap = this.diffuseRoughnessMap.toJSON(e).uuid), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessMinimum !== void 0 && (n.iridescenceThicknessMinimum = this.iridescenceThicknessMinimum), this.iridescenceThicknessMaximum !== void 0 && (n.iridescenceThicknessMaximum = this.iridescenceThicknessMaximum), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((e) => e.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new St().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.diffuseRoughness !== void 0 && (this.diffuseRoughness = e.diffuseRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessMinimum !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum), e.iridescenceThicknessMaximum !== void 0 && (this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], this.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1]), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((e) => new Sn().fromJSON(e))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (this.vertexColors = typeof e.vertexColors == "number" ? e.vertexColors > 0 : e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new I().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new I().fromArray(e.clearcoatNormalScale)), e.diffuseRoughnessMap !== void 0 && (this.diffuseRoughnessMap = t[e.diffuseRoughnessMap] || null), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Tn = /*@__PURE__*/ new L(), En = /*@__PURE__*/ new L(), Dn = /*@__PURE__*/ new L(), On = /*@__PURE__*/ new L(), kn = class {
	constructor(e = new L(), t = new L(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, Tn)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = Tn.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (Tn.copy(this.origin).addScaledVector(this.direction, t), Tn.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		En.copy(e).add(t).multiplyScalar(.5), Dn.copy(t).sub(e).normalize(), On.copy(this.origin).sub(En);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(Dn), o = On.dot(this.direction), s = -On.dot(Dn), c = On.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) {
			if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) {
				if (d >= -p) {
					if (d <= p) {
						let e = 1 / l;
						u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
					} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
				} else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
			} else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		} else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(En).addScaledVector(Dn, d), f;
	}
	intersectSphere(e, t) {
		if (e.radius < 0) return null;
		Tn.subVectors(e.center, this.origin);
		let n = Tn.dot(this.direction), r = Tn.dot(Tn) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, Tn) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		let a = this.origin, o = this.direction, s = o.x, c = o.y, l = o.z, u = e.x - a.x, d = e.y - a.y, f = e.z - a.z, p = t.x - a.x, m = t.y - a.y, h = t.z - a.z, g = n.x - a.x, _ = n.y - a.y, v = n.z - a.z, y = Math.abs(s), b = Math.abs(c), x = Math.abs(l), S, C, w, T, E, D, O, k, A, ee, j, M;
		if (y >= b && y >= x ? (w = s, D = u, A = p, M = g, s >= 0 ? (S = c, C = l, T = d, E = f, O = m, k = h, ee = _, j = v) : (S = l, C = c, T = f, E = d, O = h, k = m, ee = v, j = _)) : b >= x ? (w = c, D = d, A = m, M = _, c >= 0 ? (S = l, C = s, T = f, E = u, O = h, k = p, ee = v, j = g) : (S = s, C = l, T = u, E = f, O = p, k = h, ee = g, j = v)) : (w = l, D = f, A = h, M = v, l >= 0 ? (S = s, C = c, T = u, E = d, O = p, k = m, ee = g, j = _) : (S = c, C = s, T = d, E = u, O = m, k = p, ee = _, j = g)), w === 0) return null;
		let N = S / w, te = C / w, P = 1 / w, F = T - N * D, ne = E - te * D, re = O - N * A, ie = k - te * A, ae = ee - N * M, oe = j - te * M, se = ae * ie - oe * re, ce = F * oe - ne * ae, le = re * ne - ie * F;
		if (r) {
			if (se < 0 || ce < 0 || le < 0) return null;
		} else if ((se < 0 || ce < 0 || le < 0) && (se > 0 || ce > 0 || le > 0)) return null;
		let ue = se + ce + le;
		if (ue === 0) return null;
		let de = P * (se * D + ce * A + le * M);
		return (ue > 0 ? de < 0 : de > 0) ? null : this.at(de / ue, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, An = class extends wn {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new St(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new et(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, jn = /*@__PURE__*/ new We(), Mn = /*@__PURE__*/ new kn(), Nn = /*@__PURE__*/ new un(), Pn = /*@__PURE__*/ new L(), Fn = /*@__PURE__*/ new L(), In = /*@__PURE__*/ new L(), Ln = /*@__PURE__*/ new L(), Rn = /*@__PURE__*/ new L(), zn = /*@__PURE__*/ new L(), Bn = /*@__PURE__*/ new L(), Vn = /*@__PURE__*/ new L(), B = class extends _t {
	constructor(e = new vn(), t = new An()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			zn.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (Rn.fromBufferAttribute(s, e), a ? zn.addScaledVector(Rn, r) : zn.addScaledVector(Rn.sub(t), r));
			}
			t.add(zn);
		}
		return t;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Nn.copy(n.boundingSphere), Nn.applyMatrix4(i), Mn.copy(e.ray).recast(e.near), Nn.containsPoint(Mn.origin) === !1 && (Mn.intersectSphere(Nn, Pn) === null || Mn.origin.distanceToSquared(Pn) > (e.far - e.near) ** 2) || (jn.copy(i).invert(), Mn.copy(e.ray).applyMatrix4(jn), (n.boundingBox === null || Mn.intersectsBox(n.boundingBox) !== !1) && this._computeIntersections(e, t, Mn)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) {
			if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
				let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
					r = Un(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
				for (let d = i, f = s; d < f; d += 3) {
					let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
					r = Un(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
				}
			}
		} else if (s !== void 0) {
			if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
				let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = i, s = i + 1, d = i + 2;
					r = Un(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
				for (let s = i, d = o; s < d; s += 3) {
					let i = s, o = s + 1, d = s + 2;
					r = Un(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
				}
			}
		}
	}
};
function Hn(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	Vn.copy(s), Vn.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(Vn);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: Vn.clone(),
		object: e
	};
}
function Un(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, Fn), e.getVertexPosition(c, In), e.getVertexPosition(l, Ln);
	let u = Hn(e, t, n, r, Fn, In, Ln, Bn);
	if (u) {
		let e = new L();
		Rt.getBarycoord(Bn, Fn, In, Ln, e), i && (u.uv = Rt.getInterpolatedAttribute(i, s, c, l, e, new I())), a && (u.uv1 = Rt.getInterpolatedAttribute(a, s, c, l, e, new I())), o && (u.normal = Rt.getInterpolatedAttribute(o, s, c, l, e, new L()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new L(),
			materialIndex: 0
		};
		Rt.getNormal(Fn, In, Ln, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var Wn = class extends He {
	constructor(e = null, t = 1, n = 1, i, a, o, s, c, l = r, u = r, d, f) {
		super(null, o, s, c, l, u, i, a, d, f), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Gn = class extends rn {
	constructor(e, t, n, r = 1) {
		super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
	}
	copy(e) {
		return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
	}
}, Kn = /*@__PURE__*/ new We(), qn = /*@__PURE__*/ new We(), Jn = [], Yn = /*@__PURE__*/ new zt(), Xn = /*@__PURE__*/ new We(), Zn = /*@__PURE__*/ new B(), Qn = /*@__PURE__*/ new un(), $n = class extends B {
	constructor(e, t, n) {
		super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Gn(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
		for (let e = 0; e < n; e++) this.setMatrixAt(e, Xn);
	}
	computeBoundingBox() {
		let e = this.geometry, t = this.count;
		this.boundingBox === null && (this.boundingBox = new zt()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, Kn), Yn.copy(e.boundingBox).applyMatrix4(Kn), this.boundingBox.union(Yn);
	}
	computeBoundingSphere() {
		let e = this.geometry, t = this.count;
		this.boundingSphere === null && (this.boundingSphere = new un()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, Kn), Qn.copy(e.boundingSphere).applyMatrix4(Kn), this.boundingSphere.union(Qn);
	}
	copy(e, t) {
		return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), this.morphTexture = e.morphTexture === null ? null : e.morphTexture.clone(), this.instanceColor = e.instanceColor === null ? null : e.instanceColor.clone(), this.count = e.count, this.boundingBox = e.boundingBox === null ? null : e.boundingBox.clone(), this.boundingSphere = e.boundingSphere === null ? null : e.boundingSphere.clone(), this;
	}
	getColorAt(e, t) {
		return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		return t.fromArray(this.instanceMatrix.array, e * 16);
	}
	getMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1;
		for (let e = 0; e < n.length; e++) n[e] = r[i + e];
	}
	raycast(e, t) {
		let n = this.matrixWorld, r = this.count;
		if (Zn.geometry = this.geometry, Zn.material = this.material, Zn.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Qn.copy(this.boundingSphere), Qn.applyMatrix4(n), e.ray.intersectsSphere(Qn) !== !1)) for (let i = 0; i < r; i++) {
			this.getMatrixAt(i, Kn), qn.multiplyMatrices(n, Kn), Zn.matrixWorld = qn, Zn.raycast(e, Jn);
			for (let e = 0, n = Jn.length; e < n; e++) {
				let n = Jn[e];
				n.instanceId = i, n.object = this, t.push(n);
			}
			Jn.length = 0;
		}
	}
	setColorAt(e, t) {
		return this.instanceColor === null && (this.instanceColor = new Gn(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
	}
	setMatrixAt(e, t) {
		return t.toArray(this.instanceMatrix.array, e * 16), this;
	}
	setMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = n.length + 1;
		this.morphTexture === null && (this.morphTexture = new Wn(new Float32Array(r * this.count), r, this.count, 1028, u));
		let i = this.morphTexture.source.data.data, a = 0;
		for (let e = 0; e < n.length; e++) a += n[e];
		let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e;
		return i[s] = o, i.set(n, s + 1), this;
	}
	updateMorphTargets() {}
	dispose() {
		super.dispose(), this.instanceMatrix.dispose(), this.instanceColor !== null && this.instanceColor.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
	}
}, er = /*@__PURE__*/ new un(), tr = /*@__PURE__*/ new I(.5, .5), nr = /*@__PURE__*/ new L(), rr = class {
	constructor(e = new Sn(), t = new Sn(), n = new Sn(), r = new Sn(), i = new Sn(), a = new Sn()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = S, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), er.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), er.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(er);
	}
	intersectsSprite(e) {
		return er.center.set(0, 0, 0), er.radius = .7071067811865476 + tr.distanceTo(e.center), er.applyMatrix4(e.matrixWorld), this.intersectsSphere(er);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (nr.x = r.normal.x > 0 ? e.max.x : e.min.x, nr.y = r.normal.y > 0 ? e.max.y : e.min.y, nr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(nr) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, ir = class extends He {
	constructor(e = [], t, n, r, i, a, o, s, c, l, u, d) {
		super(null, a, o, s, c, l, r, i, u, d), this.isCompressedTexture = !0, this.image = {
			width: t,
			height: n
		}, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1;
	}
}, ar = class extends He {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r, i, a, o, s, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, or = class e extends vn {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new z(c, 3)), this.setAttribute("normal", new z(l, 3)), this.setAttribute("uv", new z(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new L();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, sr = class e extends vn {
	constructor(e = 1, t = 1, n = 4, r = 8, i = 1) {
		super(), this.type = "CapsuleGeometry", this.parameters = {
			radius: e,
			height: t,
			capSegments: n,
			radialSegments: r,
			heightSegments: i
		}, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), i = Math.max(1, Math.floor(i));
		let a = [], o = [], s = [], c = [], l = t / 2, u = Math.PI / 2 * e, d = t, f = 2 * u + d, p = n * 2 + i, m = r + 1, h = new L(), g = new L();
		for (let _ = 0; _ <= p; _++) {
			let v = 0, y = 0, b = 0, x = 0;
			if (_ <= n) {
				let t = _ / n, r = t * Math.PI / 2;
				y = -l - e * Math.cos(r), b = e * Math.sin(r), x = -e * Math.cos(r), v = t * u;
			} else if (_ <= n + i) {
				let r = (_ - n) / i;
				y = -l + r * t, b = e, x = 0, v = u + r * d;
			} else {
				let t = (_ - n - i) / n, r = t * Math.PI / 2;
				y = l + e * Math.sin(r), b = e * Math.cos(r), x = e * Math.sin(r), v = u + d + t * u;
			}
			let S = Math.max(0, Math.min(1, v / f)), C = 0;
			_ === 0 ? C = .5 / r : _ === p && (C = -.5 / r);
			for (let e = 0; e <= r; e++) {
				let t = e / r, n = t * Math.PI * 2, i = Math.sin(n), a = Math.cos(n);
				g.x = -b * a, g.y = y, g.z = b * i, o.push(g.x, g.y, g.z), h.set(-b * a, x, b * i), h.normalize(), s.push(h.x, h.y, h.z), c.push(t + C, S);
			}
			if (_ > 0) {
				let e = (_ - 1) * m;
				for (let t = 0; t < r; t++) {
					let n = e + t, r = e + t + 1, i = _ * m + t, o = _ * m + t + 1;
					a.push(n, r, i), a.push(r, o, i);
				}
			}
		}
		this.setIndex(a), this.setAttribute("position", new z(o, 3)), this.setAttribute("normal", new z(s, 3)), this.setAttribute("uv", new z(c, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
	}
}, cr = class e extends vn {
	constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
		super(), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: r
		}, t = Math.max(3, t);
		let i = [], a = [], o = [], s = [], c = new L(), l = new I();
		a.push(0, 0, 0), o.push(0, 0, 1), s.push(.5, .5);
		for (let i = 0, u = 3; i <= t; i++, u += 3) {
			let d = n + i / t * r;
			c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), o.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, s.push(l.x, l.y);
		}
		for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
		this.setIndex(i), this.setAttribute("position", new z(a, 3)), this.setAttribute("normal", new z(o, 3)), this.setAttribute("uv", new z(s, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
	}
}, lr = class e extends vn {
	constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, o = 0, s = Math.PI * 2) {
		super(), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: r,
			heightSegments: i,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		let c = this;
		r = Math.floor(r), i = Math.floor(i);
		let l = [], u = [], d = [], f = [], p = 0, m = [], h = n / 2, g = 0;
		_(), a === !1 && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(l), this.setAttribute("position", new z(u, 3)), this.setAttribute("normal", new z(d, 3)), this.setAttribute("uv", new z(f, 2));
		function _() {
			let a = new L(), _ = new L(), v = 0, y = (t - e) / n;
			for (let c = 0; c <= i; c++) {
				let l = [], g = c / i, v = g * (t - e) + e;
				for (let e = 0; e <= r; e++) {
					let t = e / r, i = t * s + o, c = Math.sin(i), m = Math.cos(i);
					_.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), d.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
				}
				m.push(l);
			}
			for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
				let a = m[r][n], o = m[r + 1][n], s = m[r + 1][n + 1], c = m[r][n + 1];
				(e > 0 || r !== 0) && (l.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (l.push(o, s, c), v += 3);
			}
			c.addGroup(g, v, 0), g += v;
		}
		function v(n) {
			let i = p, a = new I(), m = new L(), _ = 0, v = n === !0 ? e : t, y = n === !0 ? 1 : -1;
			for (let e = 1; e <= r; e++) u.push(0, h * y, 0), d.push(0, y, 0), f.push(.5, .5), p++;
			let b = p;
			for (let e = 0; e <= r; e++) {
				let t = e / r * s + o, n = Math.cos(t), i = Math.sin(t);
				m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), d.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
			}
			for (let e = 0; e < r; e++) {
				let t = i + e, r = b + e;
				n === !0 ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
			}
			c.addGroup(g, _, n === !0 ? 1 : 2), g += _;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, ur = class e extends lr {
	constructor(e = 1, t = 1, n = 32, r = 1, i = !1, a = 0, o = Math.PI * 2) {
		super(0, e, t, n, r, i, a, o), this.type = "ConeGeometry", this.parameters = {
			radius: e,
			height: t,
			radialSegments: n,
			heightSegments: r,
			openEnded: i,
			thetaStart: a,
			thetaLength: o
		};
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, dr = class {
	constructor() {
		this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
	}
	getPoint() {
		O("Curve: .getPoint() not implemented.");
	}
	getPointAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getPoint(n, t);
	}
	getPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return t;
	}
	getSpacedPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
		return t;
	}
	getLength() {
		let e = this.getLengths();
		return e[e.length - 1];
	}
	getLengths(e = this.arcLengthDivisions) {
		if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
		this.needsUpdate = !1;
		let t = [], n, r = this.getPoint(0), i = 0;
		t.push(0);
		for (let a = 1; a <= e; a++) n = this.getPoint(a / e), i += n.distanceTo(r), t.push(i), r = n;
		return this.cacheArcLengths = t, t;
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.getLengths();
	}
	getUtoTmapping(e, t = null) {
		let n = this.getLengths(), r = 0, i = n.length, a;
		a = t || e * n[i - 1];
		let o = 0, s = i - 1, c;
		for (; o <= s;) if (r = Math.floor(o + (s - o) / 2), c = n[r] - a, c < 0) o = r + 1;
		else if (c > 0) s = r - 1;
		else {
			s = r;
			break;
		}
		if (r = s, n[r] === a) return r / (i - 1);
		let l = n[r], u = n[r + 1] - l, d = (a - l) / u;
		return (r + d) / (i - 1);
	}
	getTangent(e, t) {
		let n = 1e-4, r = e - n, i = e + n;
		r < 0 && (r = 0), i > 1 && (i = 1);
		let a = this.getPoint(r), o = this.getPoint(i), s = t || (a.isVector2 ? new I() : new L());
		return s.copy(o).sub(a).normalize(), s;
	}
	getTangentAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getTangent(n, t);
	}
	computeFrenetFrames(e, t = !1) {
		let n = new L(), r = [], i = [], a = [], o = new L(), s = new We();
		for (let t = 0; t <= e; t++) {
			let n = t / e;
			r[t] = this.getTangentAt(n, new L());
		}
		i[0] = new L(), a[0] = new L();
		let c = Number.MAX_VALUE, l = Math.abs(r[0].x), u = Math.abs(r[0].y), d = Math.abs(r[0].z);
		l <= c && (c = l, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), i[0].crossVectors(r[0], o), a[0].crossVectors(r[0], i[0]);
		for (let t = 1; t <= e; t++) {
			if (i[t] = i[t - 1].clone(), a[t] = a[t - 1].clone(), o.crossVectors(r[t - 1], r[t]), o.length() > 2 ** -52) {
				o.normalize();
				let e = Math.acos(F(r[t - 1].dot(r[t]), -1, 1));
				i[t].applyMatrix4(s.makeRotationAxis(o, e));
			}
			a[t].crossVectors(r[t], i[t]);
		}
		if (t === !0) {
			let t = Math.acos(F(i[0].dot(i[e]), -1, 1));
			t /= e, r[0].dot(o.crossVectors(i[0], i[e])) > 0 && (t = -t);
			for (let n = 1; n <= e; n++) i[n].applyMatrix4(s.makeRotationAxis(r[n], t * n)), a[n].crossVectors(r[n], i[n]);
		}
		return {
			tangents: r,
			normals: i,
			binormals: a
		};
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this.cacheArcLengths = null, this;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "Curve",
			generator: "Curve.toJSON"
		} };
		return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
	}
	fromJSON(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this.cacheArcLengths = null, this;
	}
}, fr = class extends dr {
	constructor(e = 0, t = 0, n = 1, r = 1, i = 0, a = Math.PI * 2, o = !1, s = 0) {
		super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = r, this.aStartAngle = i, this.aEndAngle = a, this.aClockwise = o, this.aRotation = s;
	}
	getPoint(e, t = new I()) {
		let n = t, r = Math.PI * 2, i = this.aEndAngle - this.aStartAngle, a = Math.abs(i) < 2 ** -52;
		for (; i < 0;) i += r;
		for (; i > r;) i -= r;
		i < 2 ** -52 && (i = a ? 0 : r), this.aClockwise === !0 && !a && (i === r ? i = -r : i -= r);
		let o = this.aStartAngle + e * i, s = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
		if (this.aRotation !== 0) {
			let e = Math.cos(this.aRotation), t = Math.sin(this.aRotation), n = s - this.aX, r = c - this.aY;
			s = n * e - r * t + this.aX, c = n * t + r * e + this.aY;
		}
		return n.set(s, c);
	}
	copy(e) {
		return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
}, pr = class extends fr {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, n, r, i, a), this.isArcCurve = !0, this.type = "ArcCurve";
	}
};
function mr() {
	let e = 0, t = 0, n = 0, r = 0;
	function i(i, a, o, s) {
		e = i, t = o, n = -3 * i + 3 * a - 2 * o - s, r = 2 * i - 2 * a + o + s;
	}
	return {
		initCatmullRom: function(e, t, n, r, a) {
			i(t, n, a * (n - e), a * (r - t));
		},
		initNonuniformCatmullRom: function(e, t, n, r, a, o, s) {
			let c = (t - e) / a - (n - e) / (a + o) + (n - t) / o, l = (n - t) / o - (r - t) / (o + s) + (r - n) / s;
			c *= o, l *= o, i(t, n, c, l);
		},
		calc: function(i) {
			let a = i * i, o = a * i;
			return e + t * i + n * a + r * o;
		}
	};
}
var hr = /*@__PURE__*/ new L(), gr = /*@__PURE__*/ new L(), _r = /*@__PURE__*/ new mr(), vr = /*@__PURE__*/ new mr(), yr = /*@__PURE__*/ new mr(), br = class extends dr {
	constructor(e = [], t = !1, n = "centripetal", r = .5) {
		super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = r;
	}
	getPoint(e, t = new L()) {
		let n = t, r = this.points, i = r.length, a = (i - +!this.closed) * e, o = Math.floor(a), s = a - o;
		this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / i) + 1) * i : s === 0 && o === i - 1 && (o = i - 2, s = 1);
		let c, l;
		this.closed || o > 0 ? c = r[(o - 1) % i] : (gr.subVectors(r[0], r[1]).add(r[0]), c = gr);
		let u = r[o % i], d = r[(o + 1) % i];
		if (this.closed || o + 2 < i ? l = r[(o + 2) % i] : (hr.subVectors(r[i - 1], r[i - 2]).add(r[i - 1]), l = hr), this.curveType === "centripetal" || this.curveType === "chordal") {
			let e = this.curveType === "chordal" ? .5 : .25, t = c.distanceToSquared(u) ** +e, n = u.distanceToSquared(d) ** +e, r = d.distanceToSquared(l) ** +e;
			n < 1e-4 && (n = 1), t < 1e-4 && (t = n), r < 1e-4 && (r = n), _r.initNonuniformCatmullRom(c.x, u.x, d.x, l.x, t, n, r), vr.initNonuniformCatmullRom(c.y, u.y, d.y, l.y, t, n, r), yr.initNonuniformCatmullRom(c.z, u.z, d.z, l.z, t, n, r);
		} else this.curveType === "catmullrom" && (_r.initCatmullRom(c.x, u.x, d.x, l.x, this.tension), vr.initCatmullRom(c.y, u.y, d.y, l.y, this.tension), yr.initCatmullRom(c.z, u.z, d.z, l.z, this.tension));
		return n.set(_r.calc(s), vr.calc(s), yr.calc(s)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new L().fromArray(n));
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
};
function xr(e, t, n, r, i) {
	let a = (r - t) * .5, o = (i - n) * .5, s = e * e, c = e * s;
	return (2 * n - 2 * r + a + o) * c + (-3 * n + 3 * r - 2 * a - o) * s + a * e + n;
}
function Sr(e, t) {
	let n = 1 - e;
	return n * n * t;
}
function Cr(e, t) {
	return 2 * (1 - e) * e * t;
}
function wr(e, t) {
	return e * e * t;
}
function Tr(e, t, n, r) {
	return Sr(e, t) + Cr(e, n) + wr(e, r);
}
function Er(e, t) {
	let n = 1 - e;
	return n * n * n * t;
}
function Dr(e, t) {
	let n = 1 - e;
	return 3 * n * n * e * t;
}
function Or(e, t) {
	return 3 * (1 - e) * e * e * t;
}
function kr(e, t) {
	return e * e * e * t;
}
function Ar(e, t, n, r, i) {
	return Er(e, t) + Dr(e, n) + Or(e, r) + kr(e, i);
}
var jr = class extends dr {
	constructor(e = new I(), t = new I(), n = new I(), r = new I()) {
		super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new I()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(Ar(e, r.x, i.x, a.x, o.x), Ar(e, r.y, i.y, a.y, o.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, Mr = class extends dr {
	constructor(e = new L(), t = new L(), n = new L(), r = new L()) {
		super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new L()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(Ar(e, r.x, i.x, a.x, o.x), Ar(e, r.y, i.y, a.y, o.y), Ar(e, r.z, i.z, a.z, o.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, Nr = class extends dr {
	constructor(e = new I(), t = new I()) {
		super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new I()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new I()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, Pr = class extends dr {
	constructor(e = new L(), t = new L()) {
		super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new L()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new L()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, Fr = class extends dr {
	constructor(e = new I(), t = new I(), n = new I()) {
		super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new I()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Tr(e, r.x, i.x, a.x), Tr(e, r.y, i.y, a.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, Ir = class extends dr {
	constructor(e = new L(), t = new L(), n = new L()) {
		super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new L()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Tr(e, r.x, i.x, a.x), Tr(e, r.y, i.y, a.y), Tr(e, r.z, i.z, a.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, Lr = class extends dr {
	constructor(e = []) {
		super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
	}
	getPoint(e, t = new I()) {
		let n = t, r = this.points, i = (r.length - 1) * e, a = Math.floor(i), o = i - a, s = r[a === 0 ? a : a - 1], c = r[a], l = r[a > r.length - 2 ? r.length - 1 : a + 1], u = r[a > r.length - 3 ? r.length - 1 : a + 2];
		return n.set(xr(o, s.x, c.x, l.x, u.x), xr(o, s.y, c.y, l.y, u.y)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new I().fromArray(n));
		}
		return this;
	}
}, Rr = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ArcCurve: pr,
	CatmullRomCurve3: br,
	CubicBezierCurve: jr,
	CubicBezierCurve3: Mr,
	EllipseCurve: fr,
	LineCurve: Nr,
	LineCurve3: Pr,
	QuadraticBezierCurve: Fr,
	QuadraticBezierCurve3: Ir,
	SplineCurve: Lr
}), zr = class extends dr {
	constructor() {
		super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1, this.cacheLengths = null;
	}
	add(e) {
		this.curves.push(e);
	}
	closePath() {
		let e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
		if (!e.equals(t)) {
			let n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
			this.curves.push(new Rr[n](t, e));
		}
		return this;
	}
	getPoint(e, t) {
		let n = e * this.getLength(), r = this.getCurveLengths(), i = 0;
		for (; i < r.length;) {
			if (r[i] >= n) {
				let e = r[i] - n, a = this.curves[i], o = a.getLength(), s = o === 0 ? 0 : 1 - e / o;
				return a.getPointAt(s, t);
			}
			i++;
		}
		return null;
	}
	getLength() {
		let e = this.getCurveLengths();
		return e[e.length - 1];
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
	}
	getCurveLengths() {
		if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
		let e = [], t = 0;
		for (let n = 0, r = this.curves.length; n < r; n++) t += this.curves[n].getLength(), e.push(t);
		return this.cacheLengths = e, e;
	}
	getSpacedPoints(e = 40) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return this.autoClose && t.push(t[0]), t;
	}
	getPoints(e = 12) {
		let t = [], n;
		for (let r = 0, i = this.curves; r < i.length; r++) {
			let a = i[r], o = a.isEllipseCurve ? e * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? e * a.points.length : e, s = a.getPoints(o);
			for (let e = 0; e < s.length; e++) {
				let r = s[e];
				n && n.equals(r) || (t.push(r), n = r);
			}
		}
		return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
	}
	copy(e) {
		super.copy(e), this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(n.clone());
		}
		return this.autoClose = e.autoClose, this.cacheLengths = null, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.autoClose = this.autoClose, e.curves = [];
		for (let t = 0, n = this.curves.length; t < n; t++) {
			let n = this.curves[t];
			e.curves.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(new Rr[n.type]().fromJSON(n));
		}
		return this.cacheLengths = null, this;
	}
}, Br = class extends zr {
	constructor(e) {
		super(), this.type = "Path", this.currentPoint = new I(), e && this.setFromPoints(e);
	}
	setFromPoints(e) {
		this.moveTo(e[0].x, e[0].y);
		for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
		return this;
	}
	moveTo(e, t) {
		return this.currentPoint.set(e, t), this;
	}
	lineTo(e, t) {
		let n = new Nr(this.currentPoint.clone(), new I(e, t));
		return this.curves.push(n), this.currentPoint.set(e, t), this;
	}
	quadraticCurveTo(e, t, n, r) {
		let i = new Fr(this.currentPoint.clone(), new I(e, t), new I(n, r));
		return this.curves.push(i), this.currentPoint.set(n, r), this;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		let o = new jr(this.currentPoint.clone(), new I(e, t), new I(n, r), new I(i, a));
		return this.curves.push(o), this.currentPoint.set(i, a), this;
	}
	splineThru(e) {
		let t = new Lr([this.currentPoint.clone()].concat(e));
		return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this;
	}
	arc(e, t, n, r, i, a) {
		let o = this.currentPoint.x, s = this.currentPoint.y;
		return this.absarc(e + o, t + s, n, r, i, a), this;
	}
	absarc(e, t, n, r, i, a) {
		return this.absellipse(e, t, n, n, r, i, a), this;
	}
	ellipse(e, t, n, r, i, a, o, s) {
		let c = this.currentPoint.x, l = this.currentPoint.y;
		return this.absellipse(e + c, t + l, n, r, i, a, o, s), this;
	}
	absellipse(e, t, n, r, i, a, o, s) {
		let c = new fr(e, t, n, r, i, a, o, s);
		if (this.curves.length > 0) {
			let e = c.getPoint(0);
			e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
		}
		this.curves.push(c);
		let l = c.getPoint(1);
		return this.currentPoint.copy(l), this;
	}
	copy(e) {
		return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.currentPoint = this.currentPoint.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
	}
}, Vr = class extends Br {
	constructor(e) {
		super(e), this.uuid = P(), this.type = "Shape", this.holes = [];
	}
	getPointsHoles(e) {
		let t = [];
		for (let n = 0, r = this.holes.length; n < r; n++) t[n] = this.holes[n].getPoints(e);
		return t;
	}
	extractPoints(e) {
		return {
			shape: this.getPoints(e),
			holes: this.getPointsHoles(e)
		};
	}
	copy(e) {
		super.copy(e), this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.uuid = this.uuid, e.holes = [];
		for (let t = 0, n = this.holes.length; t < n; t++) {
			let n = this.holes[t];
			e.holes.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(new Br().fromJSON(n));
		}
		return this;
	}
};
function Hr(e, t, n = 2) {
	let r = t && t.length, i = r ? t[0] * n : e.length, a = Ur(e, 0, i, n, !0), o = [];
	if (!a || a.next === a.prev) return o;
	let s, c, l;
	if (r && (a = Xr(e, t, a, n)), e.length > 80 * n) {
		s = e[0], c = e[1];
		let t = s, r = c;
		for (let a = n; a < i; a += n) {
			let n = e[a], i = e[a + 1];
			n < s && (s = n), i < c && (c = i), n > t && (t = n), i > r && (r = i);
		}
		l = Math.max(t - s, r - c), l = l === 0 ? 0 : 32767 / l;
	}
	return Gr(a, o, n, s, c, l, 0), o;
}
function Ur(e, t, n, r, i) {
	let a;
	if (i === yi(e, t, n, r) > 0) for (let i = t; i < n; i += r) a = gi(i / r | 0, e[i], e[i + 1], a);
	else for (let i = n - r; i >= t; i -= r) a = gi(i / r | 0, e[i], e[i + 1], a);
	return a && ci(a, a.next) && (_i(a), a = a.next), a;
}
function Wr(e, t) {
	if (!e) return e;
	t ||= e;
	let n = e, r;
	do
		if (r = !1, !n.steiner && (ci(n, n.next) || V(n.prev, n, n.next) === 0)) {
			if (_i(n), n = t = n.prev, n === n.next) break;
			r = !0;
		} else n = n.next;
	while (r || n !== t);
	return t;
}
function Gr(e, t, n, r, i, a, o) {
	if (!e) return;
	!o && a && ti(e, r, i, a);
	let s = e;
	for (; e.prev !== e.next;) {
		let c = e.prev, l = e.next;
		if (a ? qr(e, r, i, a) : Kr(e)) t.push(c.i, e.i, l.i), _i(e), e = l.next, s = l.next;
		else if (e = l, e === s) {
			o ? o === 1 ? (e = Jr(Wr(e), t), Gr(e, t, n, r, i, a, 2)) : o === 2 && Yr(e, t, n, r, i, a) : Gr(Wr(e), t, n, r, i, a, 1);
			break;
		}
	}
}
function Kr(e) {
	let t = e.prev, n = e, r = e.next;
	if (V(t, n, r) >= 0) return !1;
	let i = t.x, a = n.x, o = r.x, s = t.y, c = n.y, l = r.y, u = Math.min(i, a, o), d = Math.min(s, c, l), f = Math.max(i, a, o), p = Math.max(s, c, l), m = r.next;
	for (; m !== t;) {
		if (m.x >= u && m.x <= f && m.y >= d && m.y <= p && oi(i, s, a, c, o, l, m.x, m.y) && V(m.prev, m, m.next) >= 0) return !1;
		m = m.next;
	}
	return !0;
}
function qr(e, t, n, r) {
	let i = e.prev, a = e, o = e.next;
	if (V(i, a, o) >= 0) return !1;
	let s = i.x, c = a.x, l = o.x, u = i.y, d = a.y, f = o.y, p = Math.min(s, c, l), m = Math.min(u, d, f), h = Math.max(s, c, l), g = Math.max(u, d, f), _ = ri(p, m, t, n, r), v = ri(h, g, t, n, r), y = e.prevZ, b = e.nextZ;
	for (; y && y.z >= _ && b && b.z <= v;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && oi(s, u, c, d, l, f, y.x, y.y) && V(y.prev, y, y.next) >= 0 || (y = y.prevZ, b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && oi(s, u, c, d, l, f, b.x, b.y) && V(b.prev, b, b.next) >= 0)) return !1;
		b = b.nextZ;
	}
	for (; y && y.z >= _;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && oi(s, u, c, d, l, f, y.x, y.y) && V(y.prev, y, y.next) >= 0) return !1;
		y = y.prevZ;
	}
	for (; b && b.z <= v;) {
		if (b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && oi(s, u, c, d, l, f, b.x, b.y) && V(b.prev, b, b.next) >= 0) return !1;
		b = b.nextZ;
	}
	return !0;
}
function Jr(e, t) {
	let n = e;
	do {
		let r = n.prev, i = n.next.next;
		!ci(r, i) && li(r, n, n.next, i) && pi(r, i) && pi(i, r) && (t.push(r.i, n.i, i.i), _i(n), _i(n.next), n = e = i), n = n.next;
	} while (n !== e);
	return Wr(n);
}
function Yr(e, t, n, r, i, a) {
	let o = e;
	do {
		let e = o.next.next;
		for (; e !== o.prev;) {
			if (o.i !== e.i && si(o, e)) {
				let s = hi(o, e);
				o = Wr(o, o.next), s = Wr(s, s.next), Gr(o, t, n, r, i, a, 0), Gr(s, t, n, r, i, a, 0);
				return;
			}
			e = e.next;
		}
		o = o.next;
	} while (o !== e);
}
function Xr(e, t, n, r) {
	let i = [];
	for (let n = 0, a = t.length; n < a; n++) {
		let o = Ur(e, t[n] * r, n < a - 1 ? t[n + 1] * r : e.length, r, !1);
		o === o.next && (o.steiner = !0), i.push(ii(o));
	}
	i.sort(Zr);
	for (let e = 0; e < i.length; e++) n = Qr(i[e], n);
	return n;
}
function Zr(e, t) {
	let n = e.x - t.x;
	return n === 0 && (n = e.y - t.y, n === 0 && (n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x))), n;
}
function Qr(e, t) {
	let n = $r(e, t);
	if (!n) return t;
	let r = hi(n, e);
	return Wr(r, r.next), Wr(n, n.next);
}
function $r(e, t) {
	let n = t, r = e.x, i = e.y, a = -Infinity, o;
	if (ci(e, n)) return n;
	do {
		if (ci(e, n.next)) return n.next;
		if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
			let e = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
			if (e <= r && e > a && (a = e, o = n.x < n.next.x ? n : n.next, e === r)) return o;
		}
		n = n.next;
	} while (n !== t);
	if (!o) return null;
	let s = o, c = o.x, l = o.y, u = Infinity;
	n = o;
	do {
		if (r >= n.x && n.x >= c && r !== n.x && ai(i < l ? r : a, i, c, l, i < l ? a : r, i, n.x, n.y)) {
			let t = Math.abs(i - n.y) / (r - n.x);
			pi(n, e) && (t < u || t === u && (n.x > o.x || n.x === o.x && ei(o, n))) && (o = n, u = t);
		}
		n = n.next;
	} while (n !== s);
	return o;
}
function ei(e, t) {
	return V(e.prev, e, t.prev) < 0 && V(t.next, e, e.next) < 0;
}
function ti(e, t, n, r) {
	let i = e;
	do
		i.z === 0 && (i.z = ri(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
	while (i !== e);
	i.prevZ.nextZ = null, i.prevZ = null, ni(i);
}
function ni(e) {
	let t, n = 1;
	do {
		let r = e, i;
		e = null;
		let a = null;
		for (t = 0; r;) {
			t++;
			let o = r, s = 0;
			for (let e = 0; e < n && (s++, o = o.nextZ, o); e++);
			let c = n;
			for (; s > 0 || c > 0 && o;) s !== 0 && (c === 0 || !o || r.z <= o.z) ? (i = r, r = r.nextZ, s--) : (i = o, o = o.nextZ, c--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
			r = o;
		}
		a.nextZ = null, n *= 2;
	} while (t > 1);
	return e;
}
function ri(e, t, n, r, i) {
	return e = (e - n) * i | 0, t = (t - r) * i | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function ii(e) {
	let t = e, n = e;
	do
		(t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
	while (t !== e);
	return n;
}
function ai(e, t, n, r, i, a, o, s) {
	return (i - o) * (t - s) >= (e - o) * (a - s) && (e - o) * (r - s) >= (n - o) * (t - s) && (n - o) * (a - s) >= (i - o) * (r - s);
}
function oi(e, t, n, r, i, a, o, s) {
	return (e !== o || t !== s) && ai(e, t, n, r, i, a, o, s);
}
function si(e, t) {
	return e.next.i !== t.i && e.prev.i !== t.i && !fi(e, t) && (pi(e, t) && pi(t, e) && mi(e, t) && (V(e.prev, e, t.prev) || V(e, t.prev, t)) || ci(e, t) && V(e.prev, e, e.next) > 0 && V(t.prev, t, t.next) > 0);
}
function V(e, t, n) {
	return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function ci(e, t) {
	return e.x === t.x && e.y === t.y;
}
function li(e, t, n, r) {
	let i = di(V(e, t, n)), a = di(V(e, t, r)), o = di(V(n, r, e)), s = di(V(n, r, t));
	return !!(i !== a && o !== s || i === 0 && ui(e, n, t) || a === 0 && ui(e, r, t) || o === 0 && ui(n, e, r) || s === 0 && ui(n, t, r));
}
function ui(e, t, n) {
	return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function di(e) {
	return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function fi(e, t) {
	let n = e;
	do {
		if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && li(n, n.next, e, t)) return !0;
		n = n.next;
	} while (n !== e);
	return !1;
}
function pi(e, t) {
	return V(e.prev, e, e.next) < 0 ? V(e, t, e.next) >= 0 && V(e, e.prev, t) >= 0 : V(e, t, e.prev) < 0 || V(e, e.next, t) < 0;
}
function mi(e, t) {
	let n = e, r = !1, i = (e.x + t.x) / 2, a = (e.y + t.y) / 2;
	do
		n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
	while (n !== e);
	return r;
}
function hi(e, t) {
	let n = vi(e.i, e.x, e.y), r = vi(t.i, t.x, t.y), i = e.next, a = t.prev;
	return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
}
function gi(e, t, n, r) {
	let i = vi(e, t, n);
	return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
}
function _i(e) {
	e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function vi(e, t, n) {
	return {
		i: e,
		x: t,
		y: n,
		prev: null,
		next: null,
		z: 0,
		prevZ: null,
		nextZ: null,
		steiner: !1
	};
}
function yi(e, t, n, r) {
	let i = 0;
	for (let a = t, o = n - r; a < n; a += r) i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
	return i;
}
var bi = class {
	static triangulate(e, t, n = 2) {
		return Hr(e, t, n);
	}
}, xi = class e {
	static area(e) {
		let t = e.length, n = 0;
		for (let r = t - 1, i = 0; i < t; r = i++) n += e[r].x * e[i].y - e[i].x * e[r].y;
		return n * .5;
	}
	static isClockWise(t) {
		return e.area(t) < 0;
	}
	static triangulateShape(e, t) {
		let n = [], r = [], i = [];
		Si(e), Ci(n, e);
		let a = e.length;
		t.forEach(Si);
		for (let e = 0; e < t.length; e++) r.push(a), a += t[e].length, Ci(n, t[e]);
		let o = bi.triangulate(n, r);
		for (let e = 0; e < o.length; e += 3) i.push(o.slice(e, e + 3));
		return i;
	}
};
function Si(e) {
	let t = e.length;
	t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function Ci(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y);
}
var wi = class e extends vn {
	constructor(e = new Vr([
		new I(.5, .5),
		new I(-.5, .5),
		new I(-.5, -.5),
		new I(.5, -.5)
	]), t = {}) {
		super(), this.type = "ExtrudeGeometry", this.parameters = {
			shapes: e,
			options: t
		}, e = Array.isArray(e) ? e : [e];
		let n = this, r = [], i = [];
		for (let t = 0, n = e.length; t < n; t++) {
			let n = e[t];
			a(n);
		}
		this.setAttribute("position", new z(r, 3)), this.setAttribute("uv", new z(i, 2)), this.computeVertexNormals();
		function a(e) {
			let a = [], o = t.curveSegments === void 0 ? 12 : t.curveSegments, s = t.steps === void 0 ? 1 : t.steps, c = t.depth === void 0 ? 1 : t.depth, l = t.bevelEnabled === void 0 || t.bevelEnabled, u = t.bevelThickness === void 0 ? .2 : t.bevelThickness, d = t.bevelSize === void 0 ? u - .1 : t.bevelSize, f = t.bevelOffset === void 0 ? 0 : t.bevelOffset, p = t.bevelSegments === void 0 ? 3 : t.bevelSegments, m = t.extrudePath, h = t.UVGenerator === void 0 ? Ti : t.UVGenerator, g, _ = !1, v, y, b, x;
			if (m) {
				g = m.getSpacedPoints(s), _ = !0, l = !1;
				let e = m.isCatmullRomCurve3 ? m.closed : !1;
				v = m.computeFrenetFrames(s, e), y = new L(), b = new L(), x = new L();
			}
			l || (p = 0, u = 0, d = 0, f = 0);
			let S = e.extractPoints(o), C = S.shape, w = S.holes;
			if (!xi.isClockWise(C)) {
				C = C.reverse();
				for (let e = 0, t = w.length; e < t; e++) {
					let t = w[e];
					xi.isClockWise(t) && (w[e] = t.reverse());
				}
			}
			function T(e) {
				let t = e[0];
				for (let n = 1; n <= e.length; n++) {
					let r = n % e.length, i = e[r], a = i.x - t.x, o = i.y - t.y, s = a * a + o * o, c = Math.max(Math.abs(i.x), Math.abs(i.y), Math.abs(t.x), Math.abs(t.y));
					s <= 10000000000000001e-36 * c * c ? (e.splice(r, 1), n--) : t = i;
				}
			}
			T(C), w.forEach(T);
			let E = w.length, D = C;
			for (let e = 0; e < E; e++) {
				let t = w[e];
				C = C.concat(t);
			}
			function O(e, t, n) {
				return t || k("ExtrudeGeometry: vec does not exist"), e.clone().addScaledVector(t, n);
			}
			let A = C.length;
			function ee(e, t, n) {
				let r, i, a, o = e.x - t.x, s = e.y - t.y, c = n.x - e.x, l = n.y - e.y, u = o * o + s * s, d = o * l - s * c;
				if (Math.abs(d) > 2 ** -52) {
					let d = Math.sqrt(u), f = Math.sqrt(c * c + l * l), p = t.x - s / d, m = t.y + o / d, h = n.x - l / f, g = n.y + c / f, _ = ((h - p) * l - (g - m) * c) / (o * l - s * c);
					r = p + o * _ - e.x, i = m + s * _ - e.y;
					let v = r * r + i * i;
					if (v <= 2) return new I(r, i);
					a = Math.sqrt(v / 2);
				} else {
					let e = !1;
					o > 2 ** -52 ? c > 2 ** -52 && (e = !0) : o < -(2 ** -52) ? c < -(2 ** -52) && (e = !0) : Math.sign(s) === Math.sign(l) && (e = !0), e ? (r = -s, i = o, a = Math.sqrt(u)) : (r = o, i = s, a = Math.sqrt(u / 2));
				}
				return new I(r / a, i / a);
			}
			let j = [];
			for (let e = 0, t = D.length, n = t - 1, r = e + 1; e < t; e++, n++, r++) n === t && (n = 0), r === t && (r = 0), j[e] = ee(D[e], D[n], D[r]);
			let M = [], N, te = j.concat();
			for (let e = 0, t = E; e < t; e++) {
				let t = w[e];
				N = [];
				for (let e = 0, n = t.length, r = n - 1, i = e + 1; e < n; e++, r++, i++) r === n && (r = 0), i === n && (i = 0), N[e] = ee(t[e], t[r], t[i]);
				M.push(N), te = te.concat(N);
			}
			let P;
			if (p === 0) P = xi.triangulateShape(D, w);
			else {
				let e = [], t = [];
				for (let n = 0; n < p; n++) {
					let r = n / p, i = u * Math.cos(r * Math.PI / 2), a = d * Math.sin(r * Math.PI / 2) + f;
					for (let t = 0, n = D.length; t < n; t++) {
						let n = O(D[t], j[t], a);
						oe(n.x, n.y, -i), r === 0 && e.push(n);
					}
					for (let e = 0, n = E; e < n; e++) {
						let n = w[e];
						N = M[e];
						let o = [];
						for (let e = 0, t = n.length; e < t; e++) {
							let t = O(n[e], N[e], a);
							oe(t.x, t.y, -i), r === 0 && o.push(t);
						}
						r === 0 && t.push(o);
					}
				}
				P = xi.triangulateShape(e, t);
			}
			let F = P.length, ne = d + f;
			for (let e = 0; e < A; e++) {
				let t = l ? O(C[e], te[e], ne) : C[e];
				_ ? (b.copy(v.normals[0]).multiplyScalar(t.x), y.copy(v.binormals[0]).multiplyScalar(t.y), x.copy(g[0]).add(b).add(y), oe(x.x, x.y, x.z)) : oe(t.x, t.y, 0);
			}
			for (let e = 1; e <= s; e++) for (let t = 0; t < A; t++) {
				let n = l ? O(C[t], te[t], ne) : C[t];
				_ ? (b.copy(v.normals[e]).multiplyScalar(n.x), y.copy(v.binormals[e]).multiplyScalar(n.y), x.copy(g[e]).add(b).add(y), oe(x.x, x.y, x.z)) : oe(n.x, n.y, c / s * e);
			}
			for (let e = p - 1; e >= 0; e--) {
				let t = e / p, n = u * Math.cos(t * Math.PI / 2), r = d * Math.sin(t * Math.PI / 2) + f;
				for (let e = 0, t = D.length; e < t; e++) {
					let t = O(D[e], j[e], r);
					oe(t.x, t.y, c + n);
				}
				for (let e = 0, t = w.length; e < t; e++) {
					let t = w[e];
					N = M[e];
					for (let e = 0, i = t.length; e < i; e++) {
						let i = O(t[e], N[e], r);
						_ ? oe(i.x, i.y + g[s - 1].y, g[s - 1].x + n) : oe(i.x, i.y, c + n);
					}
				}
			}
			re(), ie();
			function re() {
				let e = r.length / 3;
				if (l) {
					let e = 0, t = A * e;
					for (let e = 0; e < F; e++) {
						let n = P[e];
						se(n[2] + t, n[1] + t, n[0] + t);
					}
					e = s + p * 2, t = A * e;
					for (let e = 0; e < F; e++) {
						let n = P[e];
						se(n[0] + t, n[1] + t, n[2] + t);
					}
				} else {
					for (let e = 0; e < F; e++) {
						let t = P[e];
						se(t[2], t[1], t[0]);
					}
					for (let e = 0; e < F; e++) {
						let t = P[e];
						se(t[0] + A * s, t[1] + A * s, t[2] + A * s);
					}
				}
				n.addGroup(e, r.length / 3 - e, 0);
			}
			function ie() {
				let e = r.length / 3, t = 0;
				ae(D, t), t += D.length;
				for (let e = 0, n = w.length; e < n; e++) {
					let n = w[e];
					ae(n, t), t += n.length;
				}
				n.addGroup(e, r.length / 3 - e, 1);
			}
			function ae(e, t) {
				let n = e.length;
				for (; --n >= 0;) {
					let r = n, i = n - 1;
					i < 0 && (i = e.length - 1);
					for (let e = 0, n = s + p * 2; e < n; e++) {
						let n = A * e, a = A * (e + 1);
						ce(t + r + n, t + i + n, t + i + a, t + r + a);
					}
				}
			}
			function oe(e, t, n) {
				a.push(e), a.push(t), a.push(n);
			}
			function se(e, t, i) {
				le(e), le(t), le(i);
				let a = r.length / 3, o = h.generateTopUV(n, r, a - 3, a - 2, a - 1);
				ue(o[0]), ue(o[1]), ue(o[2]);
			}
			function ce(e, t, i, a) {
				le(e), le(t), le(a), le(t), le(i), le(a);
				let o = r.length / 3, s = h.generateSideWallUV(n, r, o - 6, o - 3, o - 2, o - 1);
				ue(s[0]), ue(s[1]), ue(s[3]), ue(s[1]), ue(s[2]), ue(s[3]);
			}
			function le(e) {
				r.push(a[e * 3 + 0]), r.push(a[e * 3 + 1]), r.push(a[e * 3 + 2]);
			}
			function ue(e) {
				i.push(e.x), i.push(e.y);
			}
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON(), t = this.parameters.shapes, n = this.parameters.options;
		return Ei(t, n, e);
	}
	static fromJSON(t, n) {
		let r = [];
		for (let e = 0, i = t.shapes.length; e < i; e++) {
			let i = n[t.shapes[e]];
			r.push(i);
		}
		let i = t.options.extrudePath;
		return i !== void 0 && (t.options.extrudePath = new Rr[i.type]().fromJSON(i)), new e(r, t.options);
	}
}, Ti = {
	generateTopUV: function(e, t, n, r, i) {
		let a = t[n * 3], o = t[n * 3 + 1], s = t[r * 3], c = t[r * 3 + 1], l = t[i * 3], u = t[i * 3 + 1];
		return [
			new I(a, o),
			new I(s, c),
			new I(l, u)
		];
	},
	generateSideWallUV: function(e, t, n, r, i, a) {
		let o = t[n * 3], s = t[n * 3 + 1], c = t[n * 3 + 2], l = t[r * 3], u = t[r * 3 + 1], d = t[r * 3 + 2], f = t[i * 3], p = t[i * 3 + 1], m = t[i * 3 + 2], h = t[a * 3], g = t[a * 3 + 1], _ = t[a * 3 + 2];
		return Math.abs(s - u) < Math.abs(o - l) ? [
			new I(o, 1 - c),
			new I(l, 1 - d),
			new I(f, 1 - m),
			new I(h, 1 - _)
		] : [
			new I(s, 1 - c),
			new I(u, 1 - d),
			new I(p, 1 - m),
			new I(g, 1 - _)
		];
	}
};
function Ei(e, t, n) {
	if (n.shapes = [], Array.isArray(e)) for (let t = 0, r = e.length; t < r; t++) {
		let r = e[t];
		n.shapes.push(r.uuid);
	}
	else n.shapes.push(e.uuid);
	return n.options = Object.assign({}, t), t.extrudePath !== void 0 && (n.options.extrudePath = t.extrudePath.toJSON()), n;
}
var Di = class e extends vn {
	constructor(e = [
		new I(0, -.5),
		new I(.5, 0),
		new I(0, .5)
	], t = 12, n = 0, r = Math.PI * 2) {
		super(), this.type = "LatheGeometry", this.parameters = {
			points: e,
			segments: t,
			phiStart: n,
			phiLength: r
		}, t = Math.floor(t), r = F(r, 0, Math.PI * 2);
		let i = [], a = [], o = [], s = [], c = [], l = 1 / t, u = new L(), d = new I(), f = new L(), p = new L(), m = new L(), h = 0, g = 0;
		for (let t = 0; t <= e.length - 1; t++) switch (t) {
			case 0:
				h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, m.copy(f), f.normalize(), s.push(f.x, f.y, f.z);
				break;
			case e.length - 1:
				m.normalize(), s.push(m.x, m.y, m.z);
				break;
			default: h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, p.copy(f), f.x += m.x, f.y += m.y, f.z += m.z, f.normalize(), s.push(f.x, f.y, f.z), m.copy(p);
		}
		for (let i = 0; i <= t; i++) {
			let f = n + i * l * r, p = Math.sin(f), m = Math.cos(f);
			for (let n = 0; n <= e.length - 1; n++) {
				u.x = e[n].x * p, u.y = e[n].y, u.z = e[n].x * m, a.push(u.x, u.y, u.z), d.x = i / t, d.y = n / (e.length - 1), o.push(d.x, d.y);
				let r = s[3 * n + 0] * p, l = s[3 * n + 1], f = s[3 * n + 0] * m;
				c.push(r, l, f);
			}
		}
		for (let n = 0; n < t; n++) for (let t = 0; t < e.length - 1; t++) {
			let r = t + n * e.length, a = r, o = r + e.length, s = r + e.length + 1, c = r + 1;
			i.push(a, o, c), i.push(s, c, o);
		}
		this.setIndex(i), this.setAttribute("position", new z(a, 3)), this.setAttribute("uv", new z(o, 2)), this.setAttribute("normal", new z(c, 3));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.points, t.segments, t.phiStart, t.phiLength);
	}
}, Oi = class e extends vn {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new z(p, 3)), this.setAttribute("normal", new z(m, 3)), this.setAttribute("uv", new z(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
}, ki = class e extends vn {
	constructor(e = .5, t = 1, n = 32, r = 1, i = 0, a = Math.PI * 2) {
		super(), this.type = "RingGeometry", this.parameters = {
			innerRadius: e,
			outerRadius: t,
			thetaSegments: n,
			phiSegments: r,
			thetaStart: i,
			thetaLength: a
		}, n = Math.max(3, n), r = Math.max(1, r);
		let o = [], s = [], c = [], l = [], u = e, d = (t - e) / r, f = new L(), p = new I();
		for (let e = 0; e <= r; e++) {
			for (let e = 0; e <= n; e++) {
				let r = i + e / n * a;
				f.x = u * Math.cos(r), f.y = u * Math.sin(r), s.push(f.x, f.y, f.z), c.push(0, 0, 1), p.x = (f.x / t + 1) / 2, p.y = (f.y / t + 1) / 2, l.push(p.x, p.y);
			}
			u += d;
		}
		for (let e = 0; e < r; e++) {
			let t = e * (n + 1);
			for (let e = 0; e < n; e++) {
				let r = e + t, i = r, a = r + n + 1, s = r + n + 2, c = r + 1;
				o.push(i, a, c), o.push(a, s, c);
			}
		}
		this.setIndex(o), this.setAttribute("position", new z(s, 3)), this.setAttribute("normal", new z(c, 3)), this.setAttribute("uv", new z(l, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
	}
}, Ai = class e extends vn {
	constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) {
		super(), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: r,
			phiLength: i,
			thetaStart: a,
			thetaLength: o
		}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
		let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new L(), d = new L(), f = [], p = [], m = [], h = [];
		for (let f = 0; f <= n; f++) {
			let g = [], _ = f / n, v = a + _ * o, y = e * Math.cos(v), b = Math.sqrt(e * e - y * y), x = 0;
			f === 0 && a === 0 ? x = .5 / t : f === n && s === Math.PI && (x = -.5 / t);
			for (let e = 0; e <= t; e++) {
				let n = e / t, a = r + n * i;
				u.x = -b * Math.cos(a), u.y = y, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(n + x, 1 - _), g.push(c++);
			}
			l.push(g);
		}
		for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
			let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1];
			(e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c);
		}
		this.setIndex(f), this.setAttribute("position", new z(p, 3)), this.setAttribute("normal", new z(m, 3)), this.setAttribute("uv", new z(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
	}
}, ji = class e extends vn {
	constructor(e = 1, t = .4, n = 12, r = 48, i = Math.PI * 2, a = 0, o = Math.PI * 2) {
		super(), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: r,
			arc: i,
			thetaStart: a,
			thetaLength: o
		}, n = Math.floor(n), r = Math.floor(r);
		let s = [], c = [], l = [], u = [], d = new L(), f = new L(), p = new L();
		for (let s = 0; s <= n; s++) {
			let m = a + s / n * o;
			for (let a = 0; a <= r; a++) {
				let o = a / r * i;
				f.x = (e + t * Math.cos(m)) * Math.cos(o), f.y = (e + t * Math.cos(m)) * Math.sin(o), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), d.x = e * Math.cos(o), d.y = e * Math.sin(o), p.subVectors(f, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(s / n);
			}
		}
		for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
			let n = (r + 1) * e + t - 1, i = (r + 1) * (e - 1) + t - 1, a = (r + 1) * (e - 1) + t, o = (r + 1) * e + t;
			s.push(n, i, o), s.push(i, a, o);
		}
		this.setIndex(s), this.setAttribute("position", new z(c, 3)), this.setAttribute("normal", new z(l, 3)), this.setAttribute("uv", new z(u, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
	}
}, Mi = class e extends vn {
	constructor(e = new Ir(new L(-1, -1, 0), new L(-1, 1, 0), new L(1, 1, 0)), t = 64, n = 1, r = 8, i = !1) {
		super(), this.type = "TubeGeometry", this.parameters = {
			path: e,
			tubularSegments: t,
			radius: n,
			radialSegments: r,
			closed: i
		};
		let a = e.computeFrenetFrames(t, i);
		this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
		let o = new L(), s = new L(), c = new I(), l = new L(), u = [], d = [], f = [], p = [];
		m(), this.setIndex(p), this.setAttribute("position", new z(u, 3)), this.setAttribute("normal", new z(d, 3)), this.setAttribute("uv", new z(f, 2));
		function m() {
			for (let e = 0; e < t; e++) h(e);
			h(i === !1 ? t : 0), _(), g();
		}
		function h(i) {
			l = e.getPointAt(i / t, l);
			let c = a.normals[i], f = a.binormals[i];
			for (let e = 0; e <= r; e++) {
				let t = e / r * Math.PI * 2, i = Math.sin(t), a = -Math.cos(t);
				s.x = a * c.x + i * f.x, s.y = a * c.y + i * f.y, s.z = a * c.z + i * f.z, s.normalize(), d.push(s.x, s.y, s.z), o.x = l.x + n * s.x, o.y = l.y + n * s.y, o.z = l.z + n * s.z, u.push(o.x, o.y, o.z);
			}
		}
		function g() {
			for (let e = 1; e <= t; e++) for (let t = 1; t <= r; t++) {
				let n = (r + 1) * (e - 1) + (t - 1), i = (r + 1) * e + (t - 1), a = (r + 1) * e + t, o = (r + 1) * (e - 1) + t;
				p.push(n, i, o), p.push(i, a, o);
			}
		}
		function _() {
			for (let e = 0; e <= t; e++) for (let n = 0; n <= r; n++) c.x = e / t, c.y = n / r, f.push(c.x, c.y);
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.path = this.parameters.path.toJSON(), e;
	}
	static fromJSON(t) {
		return new e(new Rr[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
	}
};
function Ni(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (Pi(i)) i.isRenderTargetTexture ? (O("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) {
				if (Pi(i[0])) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
					t[n][r] = e;
				} else t[n][r] = i.slice();
			} else t[n][r] = i;
		}
	}
	return t;
}
function Pi(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function Fi(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
var Ii = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", Li = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", Ri = class extends wn {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ii, this.fragmentShader = Li, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ni(e.uniforms), this.uniformsGroups = Fi(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new St().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new I().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new L().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new Ue().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new De().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new We().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, zi = class extends wn {
	constructor(e) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new St(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new St(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new I(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new et(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
};
function Bi(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function Vi(e) {
	return e !== void 0 && e.inTangents !== void 0 && e.outTangents !== void 0;
}
var Hi = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, Ui = class extends Hi {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: h,
			endingEnd: h
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case g:
				i = e, o = 2 * t - n;
				break;
			case _:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case g:
				a = e, s = 2 * n - t;
				break;
			case _:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, Wi = class extends Hi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, Gi = class extends Hi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, Ki = class extends Hi {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = Yi(n, t, g, y, r);
			i[p] = qi(x, o, _, b, m);
		}
		return i;
	}
};
function qi(e, t, n, r, i) {
	let a = 1 - e;
	return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Ji(e, t, n, r, i) {
	let a = 1 - e;
	return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function Yi(e, t, n, r, i) {
	let a = (e - t) / (i - t);
	for (let o = 0; o < 8; o++) {
		let o = qi(a, t, n, r, i) - e;
		if (Math.abs(o) < 1e-10) break;
		let s = Ji(a, t, n, r, i);
		if (Math.abs(s) < 1e-10) break;
		a = Math.max(0, Math.min(1, a - o / s));
	}
	return a;
}
var Xi = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = Bi(t, this.TimeBufferType), this.values = Bi(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: Bi(e.times, Array),
				values: Bi(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t), Vi(e.settings) && (n.settings = {
				inTangents: Bi(e.settings.inTangents, Array),
				outTangents: Bi(e.settings.outTangents, Array)
			});
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new Gi(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Wi(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new Ui(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new Ki(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case d:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case f:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case p:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case m: t = this.InterpolantFactoryMethodBezier;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw Error(t);
			}
			return O("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return d;
			case this.InterpolantFactoryMethodLinear: return f;
			case this.InterpolantFactoryMethodSmooth: return p;
			case this.InterpolantFactoryMethodBezier: return m;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
			Vi(this.settings) && (Zi(this.settings.inTangents, e), Zi(this.settings.outTangents, e));
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
			Vi(this.settings) && (Qi(this.settings.inTangents, e), Qi(this.settings.outTangents, e));
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (k("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (k("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				k("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				k("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && w(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				k("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === p, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) {
				if (r) i = !0;
				else {
					let e = o * n, r = e - n, a = e + n;
					for (let o = 0; o !== n; ++o) {
						let n = t[e + o];
						if (n !== t[r + o] || n !== t[a + o]) {
							i = !0;
							break;
						}
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, Vi(this.settings) && (r.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		}), r;
	}
};
function Zi(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] += t;
}
function Qi(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] *= t;
}
Xi.prototype.ValueTypeName = "", Xi.prototype.TimeBufferType = Float32Array, Xi.prototype.ValueBufferType = Float32Array, Xi.prototype.DefaultInterpolation = f;
var $i = class extends Xi {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
$i.prototype.ValueTypeName = "bool", $i.prototype.ValueBufferType = Array, $i.prototype.DefaultInterpolation = d, $i.prototype.InterpolantFactoryMethodLinear = void 0, $i.prototype.InterpolantFactoryMethodSmooth = void 0;
var ea = class extends Xi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
ea.prototype.ValueTypeName = "color";
var ta = class extends Xi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
ta.prototype.ValueTypeName = "number";
var na = class extends Hi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) we.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, ra = class extends Xi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new na(this.times, this.values, this.getValueSize(), e);
	}
};
ra.prototype.ValueTypeName = "quaternion", ra.prototype.InterpolantFactoryMethodSmooth = void 0;
var ia = class extends Xi {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
ia.prototype.ValueTypeName = "string", ia.prototype.ValueBufferType = Array, ia.prototype.DefaultInterpolation = d, ia.prototype.InterpolantFactoryMethodLinear = void 0, ia.prototype.InterpolantFactoryMethodSmooth = void 0;
var aa = class extends Xi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
aa.prototype.ValueTypeName = "vector";
var oa = class extends _t {
	static registerNode(e) {
		this.prototype._lightNode = e;
	}
	constructor(e, t = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new St(e), this.intensity = t;
	}
	copy(e, t) {
		return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
	}
}, sa = /*@__PURE__*/ new We(), ca = /*@__PURE__*/ new L(), la = /*@__PURE__*/ new L(), ua = class {
	constructor(e) {
		this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new I(512, 512), this.mapType = l, this.map = null, this.mapPass = null, this.matrix = new We(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new rr(), this._frameExtents = new I(1, 1), this._viewportCount = 1, this._viewports = [new Ue(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getCamera() {
		return this.camera;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		let t = this.camera;
		ca.setFromMatrixPosition(e.matrixWorld), t.position.copy(ca), la.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(la), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
	}
	_updateMatrix(e, t, n, r) {
		sa.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(sa, e.coordinateSystem, e.reversedDepth);
		let i = this._frameExtents, a = r ? r.z / i.x : 1, o = r ? r.w / i.y : 1, s = r ? r.x / i.x : 0, c = r ? r.y / i.y : 0;
		e.coordinateSystem === 2001 || e.reversedDepth ? t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), t.multiply(sa);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.mapType = e.mapType, this.biasNode = e.biasNode, this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let e = {};
		return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.mapType = this.mapType, e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
	}
}, da = /*@__PURE__*/ new L(), fa = /*@__PURE__*/ new we(), pa = /*@__PURE__*/ new L(), ma = class extends _t {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new We(), this.projectionMatrix = new We(), this.projectionMatrixInverse = new We(), this.coordinateSystem = S, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(da, fa, pa), pa.x === 1 && pa.y === 1 && pa.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(da, fa, pa.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(da, fa, pa), pa.x === 1 && pa.y === 1 && pa.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(da, fa, pa.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, ha = /*@__PURE__*/ new L(), ga = /*@__PURE__*/ new I(), _a = /*@__PURE__*/ new I(), va = class extends ma {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = te * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(N * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return te * 2 * Math.atan(Math.tan(N * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		ha.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(ha.x, ha.y).multiplyScalar(-e / ha.z), ha.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(ha.x, ha.y).multiplyScalar(-e / ha.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, ga, _a), t.subVectors(_a, ga);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(N * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, ya = class extends ua {
	constructor() {
		super(new va(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, ba = class extends oa {
	constructor(e, t, n = 0, r = 2) {
		super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new ya();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
	}
}, xa = "\\[\\]\\.:\\/", Sa = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), Ca = "[^\\[\\]\\.:\\/]", wa = "[^" + xa.replace("\\.", "") + "]", Ta = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", Ca), Ea = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", wa), Da = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", Ca), Oa = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", Ca), ka = RegExp("^" + Ta + Ea + Da + Oa + "$"), Aa = [
	"material",
	"materials",
	"bones",
	"map"
], ja = class {
	constructor(e, t, n) {
		let r = n || H.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, H = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(Sa, "");
	}
	static parseTrackName(e) {
		let t = ka.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			Aa.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			O("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						k("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						k("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						k("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						k("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						k("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						k("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					k("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			k("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					k("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					k("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
H.Composite = ja, H.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, H.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, H.prototype.GetterByBindingType = [
	H.prototype._getValue_direct,
	H.prototype._getValue_array,
	H.prototype._getValue_arrayElement,
	H.prototype._getValue_toArray
], H.prototype.SetterByBindingTypeAndVersioning = [
	[
		H.prototype._setValue_direct,
		H.prototype._setValue_direct_setNeedsUpdate,
		H.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		H.prototype._setValue_array,
		H.prototype._setValue_array_setNeedsUpdate,
		H.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		H.prototype._setValue_arrayElement,
		H.prototype._setValue_arrayElement_setNeedsUpdate,
		H.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		H.prototype._setValue_fromArray,
		H.prototype._setValue_fromArray_setNeedsUpdate,
		H.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
], class {
	static {
		this.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "187" } })), typeof window < "u" && (window.__THREE__ ? O("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "187");
// node_modules/three/examples/jsm/exporters/GLTFExporter.js
var Ma = {
	POSITION: [
		"byte",
		"byte normalized",
		"unsigned byte",
		"unsigned byte normalized",
		"short",
		"short normalized",
		"unsigned short",
		"unsigned short normalized"
	],
	NORMAL: ["byte normalized", "short normalized"],
	TANGENT: ["byte normalized", "short normalized"],
	TEXCOORD: [
		"byte",
		"byte normalized",
		"unsigned byte",
		"short",
		"short normalized",
		"unsigned short"
	]
}, Na = class {
	constructor() {
		this.textureUtils = null, this.pluginCallbacks = [], this.register(function(e) {
			return new $a(e);
		}), this.register(function(e) {
			return new eo(e);
		}), this.register(function(e) {
			return new io(e);
		}), this.register(function(e) {
			return new ao(e);
		}), this.register(function(e) {
			return new oo(e);
		}), this.register(function(e) {
			return new so(e);
		}), this.register(function(e) {
			return new to(e);
		}), this.register(function(e) {
			return new no(e);
		}), this.register(function(e) {
			return new ro(e);
		}), this.register(function(e) {
			return new co(e);
		}), this.register(function(e) {
			return new lo(e);
		}), this.register(function(e) {
			return new uo(e);
		}), this.register(function(e) {
			return new fo(e);
		}), this.register(function(e) {
			return new po(e);
		});
	}
	register(e) {
		return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
	}
	unregister(e) {
		return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
	}
	setTextureUtils(e) {
		return this.textureUtils = e, this;
	}
	parse(e, t, n, r) {
		let i = new Qa(), a = [];
		for (let e = 0, t = this.pluginCallbacks.length; e < t; e++) a.push(this.pluginCallbacks[e](i));
		i.setPlugins(a), i.setTextureUtils(this.textureUtils), i.writeAsync(e, t, r).catch(n);
	}
	parseAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.parse(e, r, i, t);
		});
	}
}, U = {
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	BYTE: 5120,
	UNSIGNED_BYTE: 5121,
	SHORT: 5122,
	UNSIGNED_SHORT: 5123,
	INT: 5124,
	UNSIGNED_INT: 5125,
	FLOAT: 5126,
	ARRAY_BUFFER: 34962,
	ELEMENT_ARRAY_BUFFER: 34963,
	NEAREST: 9728,
	LINEAR: 9729,
	NEAREST_MIPMAP_NEAREST: 9984,
	LINEAR_MIPMAP_NEAREST: 9985,
	NEAREST_MIPMAP_LINEAR: 9986,
	LINEAR_MIPMAP_LINEAR: 9987,
	CLAMP_TO_EDGE: 33071,
	MIRRORED_REPEAT: 33648,
	REPEAT: 10497
}, Pa = "KHR_mesh_quantization", Fa = {};
Fa[r] = U.NEAREST, Fa[i] = U.NEAREST_MIPMAP_NEAREST, Fa[a] = U.NEAREST_MIPMAP_LINEAR, Fa[o] = U.LINEAR, Fa[s] = U.LINEAR_MIPMAP_NEAREST, Fa[c] = U.LINEAR_MIPMAP_LINEAR, Fa[t] = U.CLAMP_TO_EDGE, Fa[e] = U.REPEAT, Fa[n] = U.MIRRORED_REPEAT;
var Ia = {
	scale: "scale",
	position: "translation",
	quaternion: "rotation",
	morphTargetInfluences: "weights"
}, La = new St(), Ra = 12, za = 1179937895, Ba = 2, Va = 8, Ha = 1313821514, Ua = 5130562;
function Wa(e, t) {
	return e.length === t.length && e.every(function(e, n) {
		return e === t[n];
	});
}
function Ga(e) {
	return new TextEncoder().encode(e).buffer;
}
function Ka(e) {
	return Wa(e.elements, [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]);
}
function qa(e, t, n) {
	let r = {
		min: Array(e.itemSize).fill(Infinity),
		max: Array(e.itemSize).fill(-Infinity)
	};
	for (let i = t; i < t + n; i++) for (let t = 0; t < e.itemSize; t++) {
		let n;
		e.itemSize > 4 ? n = e.array[i * e.itemSize + t] : (t === 0 ? n = e.getX(i) : t === 1 ? n = e.getY(i) : t === 2 ? n = e.getZ(i) : t === 3 && (n = e.getW(i)), e.normalized === !0 && (n = Ce.normalize(n, e.array))), r.min[t] = Math.min(r.min[t], n), r.max[t] = Math.max(r.max[t], n);
	}
	return r;
}
function Ja(e) {
	return Math.ceil(e / 4) * 4;
}
function Ya(e, t = 0) {
	let n = Ja(e.byteLength);
	if (n !== e.byteLength) {
		let r = new Uint8Array(n);
		if (r.set(new Uint8Array(e)), t !== 0) for (let i = e.byteLength; i < n; i++) r[i] = t;
		return r.buffer;
	}
	return e;
}
function Xa() {
	return typeof document > "u" && typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1) : document.createElement("canvas");
}
function Za(e, t) {
	if (typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas) {
		let n;
		return t === "image/jpeg" ? n = .92 : t === "image/webp" && (n = .8), e.convertToBlob({
			type: t,
			quality: n
		});
	}
	return new Promise((n) => e.toBlob(n, t));
}
var Qa = class {
	constructor() {
		this.plugins = [], this.options = {}, this.pending = [], this.buffers = [], this.byteOffset = 0, this.buffers = [], this.nodeMap = /* @__PURE__ */ new Map(), this.skins = [], this.extensionsUsed = {}, this.extensionsRequired = {}, this.uids = /* @__PURE__ */ new Map(), this.uid = 0, this.json = { asset: {
			version: "2.0",
			generator: "THREE.GLTFExporter r187"
		} }, this.cache = {
			meshes: /* @__PURE__ */ new Map(),
			attributes: /* @__PURE__ */ new Map(),
			attributesNormalized: /* @__PURE__ */ new Map(),
			materials: /* @__PURE__ */ new Map(),
			textures: /* @__PURE__ */ new Map(),
			images: /* @__PURE__ */ new Map(),
			normalMaps: /* @__PURE__ */ new Map()
		}, this.textureUtils = null;
	}
	setPlugins(e) {
		this.plugins = e;
	}
	setTextureUtils(e) {
		this.textureUtils = e;
	}
	async writeAsync(e, t, n = {}) {
		this.options = Object.assign({
			binary: !1,
			trs: !1,
			onlyVisible: !0,
			maxTextureSize: Infinity,
			animations: [],
			includeCustomExtensions: !1,
			copyright: null
		}, n), this.options.animations.length > 0 && (this.options.trs = !0), await this.processInputAsync(e), await Promise.all(this.pending);
		let r = this, i = r.buffers, a = r.json;
		n = r.options;
		let o = r.extensionsUsed, s = r.extensionsRequired, c = new Blob(i, { type: "application/octet-stream" }), l = Object.keys(o), u = Object.keys(s);
		if (l.length > 0 && (a.extensionsUsed = l), u.length > 0 && (a.extensionsRequired = u), a.buffers && a.buffers.length > 0 && (a.buffers[0].byteLength = c.size), n.copyright && (a.asset.copyright = n.copyright), n.binary === !0) {
			let e = new FileReader();
			e.readAsArrayBuffer(c), e.onloadend = function() {
				let n = Ya(e.result), r = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(Va));
				r.setUint32(0, n.byteLength, !0), r.setUint32(4, Ua, !0);
				let i = Ya(Ga(JSON.stringify(a)), 32), o = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(Va));
				o.setUint32(0, i.byteLength, !0), o.setUint32(4, Ha, !0);
				let s = /* @__PURE__ */ new ArrayBuffer(Ra), c = new DataView(s);
				c.setUint32(0, za, !0), c.setUint32(4, Ba, !0);
				let l = Ra + o.byteLength + i.byteLength + r.byteLength + n.byteLength;
				c.setUint32(8, l, !0);
				let u = new Blob([
					s,
					o,
					i,
					r,
					n
				], { type: "application/octet-stream" }), d = new FileReader();
				d.readAsArrayBuffer(u), d.onloadend = function() {
					t(d.result);
				};
			};
		} else if (a.buffers && a.buffers.length > 0) {
			let e = new FileReader();
			e.readAsDataURL(c), e.onloadend = function() {
				let n = e.result;
				a.buffers[0].uri = n, t(a);
			};
		} else t(a);
	}
	serializeUserData(e, t) {
		if (Object.keys(e.userData).length === 0) return;
		let n = this.options, r = this.extensionsUsed;
		try {
			let i = JSON.parse(JSON.stringify(e.userData));
			if (n.includeCustomExtensions && i.gltfExtensions) {
				t.extensions === void 0 && (t.extensions = {});
				for (let e in i.gltfExtensions) t.extensions[e] = i.gltfExtensions[e], r[e] = !0;
				delete i.gltfExtensions;
			}
			Object.keys(i).length > 0 && (t.extras = i);
		} catch (t) {
			console.warn("THREE.GLTFExporter: userData of '" + e.name + "' won't be serialized because of JSON.stringify error - " + t.message);
		}
	}
	getUID(e, t = !1) {
		if (this.uids.has(e) === !1) {
			let t = /* @__PURE__ */ new Map();
			t.set(!0, this.uid++), t.set(!1, this.uid++), this.uids.set(e, t);
		}
		return this.uids.get(e).get(t);
	}
	isNormalizedNormalAttribute(e) {
		if (this.cache.attributesNormalized.has(e)) return !1;
		let t = new L();
		for (let n = 0, r = e.count; n < r; n++) if (Math.abs(t.fromBufferAttribute(e, n).length() - 1) > 5e-4) return !1;
		return !0;
	}
	createNormalizedNormalAttribute(e) {
		let t = this.cache;
		if (t.attributesNormalized.has(e)) return t.attributesNormalized.get(e);
		let n = e.clone(), r = new L();
		for (let e = 0, t = n.count; e < t; e++) r.fromBufferAttribute(n, e), r.x === 0 && r.y === 0 && r.z === 0 ? r.setX(1) : r.normalize(), n.setXYZ(e, r.x, r.y, r.z);
		return t.attributesNormalized.set(e, n), n;
	}
	applyTextureTransform(e, t) {
		let n = !1, r = {};
		(t.offset.x !== 0 || t.offset.y !== 0) && (r.offset = t.offset.toArray(), n = !0), t.rotation !== 0 && (r.rotation = t.rotation, n = !0), (t.repeat.x !== 1 || t.repeat.y !== 1) && (r.scale = t.repeat.toArray(), n = !0), n && (e.extensions = e.extensions || {}, e.extensions.KHR_texture_transform = r, this.extensionsUsed.KHR_texture_transform = !0);
	}
	async buildMetalRoughTextureAsync(e, t) {
		if (e === t) return e;
		function n(e) {
			return e.colorSpace === "srgb" ? function(e) {
				return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
			} : function(e) {
				return e;
			};
		}
		e instanceof ir && (e = await this.decompressTextureAsync(e)), t instanceof ir && (t = await this.decompressTextureAsync(t));
		let r = e ? e.image : null, i = t ? t.image : null, a = Math.max(r ? r.width : 0, i ? i.width : 0), o = Math.max(r ? r.height : 0, i ? i.height : 0), s = Xa();
		s.width = a, s.height = o;
		let c = s.getContext("2d", { willReadFrequently: !0 });
		c.fillStyle = "#00ffff", c.fillRect(0, 0, a, o);
		let l = c.getImageData(0, 0, a, o);
		if (r) {
			c.drawImage(r, 0, 0, a, o);
			let t = n(e), i = c.getImageData(0, 0, a, o).data;
			for (let e = 2; e < i.length; e += 4) l.data[e] = t(i[e] / 256) * 256;
		}
		if (i) {
			c.drawImage(i, 0, 0, a, o);
			let e = n(t), r = c.getImageData(0, 0, a, o).data;
			for (let t = 1; t < r.length; t += 4) l.data[t] = e(r[t] / 256) * 256;
		}
		c.putImageData(l, 0, 0);
		let u = (e || t).clone();
		return u.source = new Re(s), u.colorSpace = "", u.channel = (e || t).channel, e && t && e.channel !== t.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."), console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."), u;
	}
	async buildNormalMapTextureAsync(e, t, n) {
		e instanceof ir && (e = await this.decompressTextureAsync(e));
		let r = e.image, i = Xa();
		i.width = r.width, i.height = r.height;
		let a = i.getContext("2d", { willReadFrequently: !0 });
		a.drawImage(r, 0, 0, i.width, i.height);
		let o = a.getImageData(0, 0, i.width, i.height), s = o.data;
		for (let e = 0; e < s.length; e += 4) t && (s[e + 0] = 255 - s[e + 0]), n && (s[e + 1] = 255 - s[e + 1]);
		a.putImageData(o, 0, 0);
		let c = e.clone();
		return c.source = new Re(i), c;
	}
	async decompressTextureAsync(e, t = Infinity) {
		if (this.textureUtils === null) throw Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");
		return await this.textureUtils.decompress(e, t);
	}
	processBuffer(e) {
		let t = this.json, n = this.buffers;
		return t.buffers ||= [{ byteLength: 0 }], n.push(e), 0;
	}
	processBufferView(e, t, n, r, i) {
		let a = this.json;
		a.bufferViews ||= [];
		let o;
		switch (t) {
			case U.BYTE:
			case U.UNSIGNED_BYTE:
				o = 1;
				break;
			case U.SHORT:
			case U.UNSIGNED_SHORT:
				o = 2;
				break;
			default: o = 4;
		}
		let s = e.itemSize * o;
		i === U.ARRAY_BUFFER && (s = Math.ceil(s / 4) * 4);
		let c = Ja(r * s), l = new DataView(new ArrayBuffer(c)), u = 0;
		for (let i = n; i < n + r; i++) {
			for (let n = 0; n < e.itemSize; n++) {
				let r;
				e.itemSize > 4 ? r = e.array[i * e.itemSize + n] : (n === 0 ? r = e.getX(i) : n === 1 ? r = e.getY(i) : n === 2 ? r = e.getZ(i) : n === 3 && (r = e.getW(i)), e.normalized === !0 && (r = Ce.normalize(r, e.array))), t === U.FLOAT ? l.setFloat32(u, r, !0) : t === U.INT ? l.setInt32(u, r, !0) : t === U.UNSIGNED_INT ? l.setUint32(u, r, !0) : t === U.SHORT ? l.setInt16(u, r, !0) : t === U.UNSIGNED_SHORT ? l.setUint16(u, r, !0) : t === U.BYTE ? l.setInt8(u, r) : t === U.UNSIGNED_BYTE && l.setUint8(u, r), u += o;
			}
			u % s !== 0 && (u += s - u % s);
		}
		let d = {
			buffer: this.processBuffer(l.buffer),
			byteOffset: this.byteOffset,
			byteLength: c
		};
		return i !== void 0 && (d.target = i), i === U.ARRAY_BUFFER && (d.byteStride = s), this.byteOffset += c, a.bufferViews.push(d), {
			id: a.bufferViews.length - 1,
			byteLength: 0
		};
	}
	processBufferViewImage(e) {
		let t = this, n = t.json;
		return n.bufferViews ||= [], new Promise(function(r) {
			let i = new FileReader();
			i.readAsArrayBuffer(e), i.onloadend = function() {
				let e = Ya(i.result), a = {
					buffer: t.processBuffer(e),
					byteOffset: t.byteOffset,
					byteLength: e.byteLength
				};
				t.byteOffset += e.byteLength, r(n.bufferViews.push(a) - 1);
			};
		});
	}
	processAccessor(e, t, n, r) {
		let i = this.json, a = {
			1: "SCALAR",
			2: "VEC2",
			3: "VEC3",
			4: "VEC4",
			9: "MAT3",
			16: "MAT4"
		}, o;
		if (e.array.constructor === Float32Array) o = U.FLOAT;
		else if (e.array.constructor === Int32Array) o = U.INT;
		else if (e.array.constructor === Uint32Array) o = U.UNSIGNED_INT;
		else if (e.array.constructor === Int16Array) o = U.SHORT;
		else if (e.array.constructor === Uint16Array) o = U.UNSIGNED_SHORT;
		else if (e.array.constructor === Int8Array) o = U.BYTE;
		else if (e.array.constructor === Uint8Array) o = U.UNSIGNED_BYTE;
		else throw Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + e.array.constructor.name);
		if (n === void 0 && (n = 0), (r === void 0 || r === Infinity) && (r = e.count), r === 0) return null;
		let s = qa(e, n, r), c;
		t !== void 0 && (c = e === t.index ? U.ELEMENT_ARRAY_BUFFER : U.ARRAY_BUFFER);
		let l = this.processBufferView(e, o, n, r, c), u = {
			bufferView: l.id,
			byteOffset: l.byteOffset,
			componentType: o,
			count: r,
			max: s.max,
			min: s.min,
			type: a[e.itemSize]
		};
		return e.normalized === !0 && (u.normalized = !0), i.accessors ||= [], i.accessors.push(u) - 1;
	}
	processImage(e, t, n, r = "image/png") {
		if (e !== null) {
			let i = this, a = i.cache, o = i.json, s = i.options, c = i.pending;
			a.images.has(e) || a.images.set(e, {});
			let l = a.images.get(e), u = r + ":flipY/" + n.toString();
			if (l[u] !== void 0) return l[u];
			o.images ||= [];
			let d = { mimeType: r }, f = Xa();
			f.width = Math.min(e.width, s.maxTextureSize), f.height = Math.min(e.height, s.maxTextureSize);
			let p = f.getContext("2d", { willReadFrequently: !0 });
			if (n === !0 && (p.translate(0, f.height), p.scale(1, -1)), e.data !== void 0) {
				t !== 1023 && console.error("GLTFExporter: Only RGBAFormat is supported.", t), (e.width > s.maxTextureSize || e.height > s.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", e);
				let n = new Uint8ClampedArray(e.height * e.width * 4);
				for (let t = 0; t < n.length; t += 4) n[t + 0] = e.data[t + 0], n[t + 1] = e.data[t + 1], n[t + 2] = e.data[t + 2], n[t + 3] = e.data[t + 3];
				p.putImageData(new ImageData(n, e.width, e.height), 0, 0);
			} else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas) p.drawImage(e, 0, 0, f.width, f.height);
			else throw Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");
			s.binary === !0 ? c.push(Za(f, r).then((e) => i.processBufferViewImage(e)).then((e) => {
				d.bufferView = e;
			})) : d.uri = Ie.getDataURL(f, r);
			let m = o.images.push(d) - 1;
			return l[u] = m, m;
		}
		throw Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.");
	}
	processSampler(e) {
		let t = this.json;
		t.samplers ||= [];
		let n = {
			magFilter: Fa[e.magFilter],
			minFilter: Fa[e.minFilter],
			wrapS: Fa[e.wrapS],
			wrapT: Fa[e.wrapT]
		};
		return t.samplers.push(n) - 1;
	}
	async processTextureAsync(e) {
		let t = this.options, n = this.cache, r = this.json;
		if (n.textures.has(e)) return n.textures.get(e);
		r.textures ||= [], e instanceof ir && (e = await this.decompressTextureAsync(e, t.maxTextureSize));
		let i = e.userData.mimeType, a = this.processImage(e.image, e.format, e.flipY, i), o = { sampler: this.processSampler(e) };
		i === "image/webp" ? (o.extensions = o.extensions || {}, o.extensions.EXT_texture_webp = { source: a }, this.extensionsUsed.EXT_texture_webp = !0, this.extensionsRequired.EXT_texture_webp = !0) : o.source = a, e.name && (o.name = e.name), await this._invokeAllAsync(async function(t) {
			t.writeTexture && await t.writeTexture(e, o);
		});
		let s = r.textures.push(o) - 1;
		return n.textures.set(e, s), s;
	}
	async processMaterialAsync(e, t) {
		let n = this.cache, r = this.json, i = t !== void 0 && t.hasAttribute("tangent"), a = e.normalMap ? e.uuid + ":" + i : e.uuid;
		if (n.materials.has(a)) return n.materials.get(a);
		if (e.isShaderMaterial) return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."), null;
		r.materials ||= [];
		let o = { pbrMetallicRoughness: {} };
		e.isMeshStandardMaterial !== !0 && e.isMeshBasicMaterial !== !0 && console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
		let s = e.color.toArray().concat([e.opacity]);
		if (Wa(s, [
			1,
			1,
			1,
			1
		]) || (o.pbrMetallicRoughness.baseColorFactor = s), e.isMeshStandardMaterial ? (o.pbrMetallicRoughness.metallicFactor = e.metalness, o.pbrMetallicRoughness.roughnessFactor = e.roughness) : (o.pbrMetallicRoughness.metallicFactor = 0, o.pbrMetallicRoughness.roughnessFactor = 1), e.metalnessMap || e.roughnessMap) {
			let t = await this.buildMetalRoughTextureAsync(e.metalnessMap, e.roughnessMap), n = {
				index: await this.processTextureAsync(t),
				texCoord: t.channel
			};
			this.applyTextureTransform(n, t), o.pbrMetallicRoughness.metallicRoughnessTexture = n;
		}
		if (e.map) {
			let t = {
				index: await this.processTextureAsync(e.map),
				texCoord: e.map.channel
			};
			this.applyTextureTransform(t, e.map), o.pbrMetallicRoughness.baseColorTexture = t;
		}
		if (e.emissive) {
			let t = e.emissive;
			if (Math.max(t.r, t.g, t.b) > 0 && (o.emissiveFactor = e.emissive.toArray()), e.emissiveMap) {
				let t = {
					index: await this.processTextureAsync(e.emissiveMap),
					texCoord: e.emissiveMap.channel
				};
				this.applyTextureTransform(t, e.emissiveMap), o.emissiveTexture = t;
			}
		}
		if (e.normalMap) {
			let t = e.normalScale, r = t.x < 0, a = i ? t.y < 0 : t.y > 0, s = e.normalMap;
			if (r || a) {
				n.normalMaps.has(e.normalMap) === !1 && n.normalMaps.set(e.normalMap, {});
				let t = n.normalMaps.get(e.normalMap), i = `${r}:${a}`;
				t[i] === void 0 && (t[i] = await this.buildNormalMapTextureAsync(e.normalMap, r, a)), s = t[i];
			}
			let c = {
				index: await this.processTextureAsync(s),
				texCoord: e.normalMap.channel
			};
			Math.abs(t.x) !== 1 && (c.scale = Math.abs(t.x)), this.applyTextureTransform(c, e.normalMap), o.normalTexture = c;
		}
		if (e.aoMap) {
			let t = {
				index: await this.processTextureAsync(e.aoMap),
				texCoord: e.aoMap.channel
			};
			e.aoMapIntensity !== 1 && (t.strength = e.aoMapIntensity), this.applyTextureTransform(t, e.aoMap), o.occlusionTexture = t;
		}
		e.transparent ? o.alphaMode = "BLEND" : e.alphaTest > 0 && (o.alphaMode = "MASK", o.alphaCutoff = e.alphaTest), e.side === 2 && (o.doubleSided = !0), e.name !== "" && (o.name = e.name), this.serializeUserData(e, o), await this._invokeAllAsync(async function(t) {
			t.writeMaterialAsync && await t.writeMaterialAsync(e, o);
		});
		let c = r.materials.push(o) - 1;
		return n.materials.set(a, c), c;
	}
	async processMeshAsync(e) {
		let t = this.cache, n = this.json, r = [e.geometry.uuid];
		if (Array.isArray(e.material)) for (let t = 0, n = e.material.length; t < n; t++) r.push(e.material[t].uuid);
		else r.push(e.material.uuid);
		let i = r.join(":");
		if (t.meshes.has(i)) return t.meshes.get(i);
		let a = e.geometry, o;
		o = e.isLineSegments ? U.LINES : e.isLineLoop ? U.LINE_LOOP : e.isLine ? U.LINE_STRIP : e.isPoints ? U.POINTS : e.material.wireframe ? U.LINES : U.TRIANGLES;
		let s = {}, c = {}, l = [], u = [], d = {
			uv: "TEXCOORD_0",
			uv1: "TEXCOORD_1",
			uv2: "TEXCOORD_2",
			uv3: "TEXCOORD_3",
			color: "COLOR_0",
			skinWeight: "WEIGHTS_0",
			skinIndex: "JOINTS_0"
		}, f = a.getAttribute("normal");
		f !== void 0 && !this.isNormalizedNormalAttribute(f) && (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."), a.setAttribute("normal", this.createNormalizedNormalAttribute(f)));
		let p = null;
		for (let e in a.attributes) {
			if (e.slice(0, 5) === "morph") continue;
			let n = a.attributes[e];
			if (e = d[e] || e.toUpperCase(), !/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(e) && !e.startsWith("_") && (e = "_" + e), t.attributes.has(this.getUID(n))) {
				c[e] = t.attributes.get(this.getUID(n));
				continue;
			}
			p = null;
			let r = n.array;
			e === "JOINTS_0" && !(r instanceof Uint16Array) && !(r instanceof Uint8Array) ? (console.warn("GLTFExporter: Attribute \"skinIndex\" converted to type UNSIGNED_SHORT."), p = Na.Utils.toTypedBufferAttribute(n, Uint16Array)) : (r instanceof Uint32Array || r instanceof Int32Array) && !e.startsWith("_") && (console.warn(`GLTFExporter: Attribute "${e}" converted to type FLOAT.`), p = Na.Utils.toTypedBufferAttribute(n, Float32Array));
			let i = this.processAccessor(p || n, a);
			i !== null && (e.startsWith("_") || this.detectMeshQuantization(e, n), c[e] = i, t.attributes.set(this.getUID(n), i));
		}
		if (f !== void 0 && a.setAttribute("normal", f), Object.keys(c).length === 0) return null;
		if (e.morphTargetInfluences !== void 0 && e.morphTargetInfluences.length > 0) {
			let n = [], r = [], i = {};
			if (e.morphTargetDictionary !== void 0) for (let t in e.morphTargetDictionary) i[e.morphTargetDictionary[t]] = t;
			for (let o = 0; o < e.morphTargetInfluences.length; ++o) {
				let s = {}, c = !1;
				for (let e in a.morphAttributes) {
					if (e !== "position" && e !== "normal") {
						c ||= (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."), !0);
						continue;
					}
					let n = a.morphAttributes[e][o], r = e.toUpperCase(), i = a.attributes[e];
					if (t.attributes.has(this.getUID(n, !0))) {
						s[r] = t.attributes.get(this.getUID(n, !0));
						continue;
					}
					let l = n.clone();
					if (!a.morphTargetsRelative) for (let e = 0, t = n.count; e < t; e++) for (let t = 0; t < n.itemSize; t++) t === 0 && l.setX(e, n.getX(e) - i.getX(e)), t === 1 && l.setY(e, n.getY(e) - i.getY(e)), t === 2 && l.setZ(e, n.getZ(e) - i.getZ(e)), t === 3 && l.setW(e, n.getW(e) - i.getW(e));
					s[r] = this.processAccessor(l, a), t.attributes.set(this.getUID(i, !0), s[r]);
				}
				u.push(s), n.push(e.morphTargetInfluences[o]), e.morphTargetDictionary !== void 0 && r.push(i[o]);
			}
			s.weights = n, r.length > 0 && (s.extras = {}, s.extras.targetNames = r);
		}
		let m = Array.isArray(e.material);
		if (m && a.groups.length === 0) return null;
		let h = !1;
		if (m && a.index === null) {
			let e = [];
			for (let t = 0, n = a.attributes.position.count; t < n; t++) e[t] = t;
			a.setIndex(e), h = !0;
		}
		let g = m ? e.material : [e.material], _ = m ? a.groups : [{
			materialIndex: 0,
			start: void 0,
			count: void 0
		}];
		for (let e = 0, n = _.length; e < n; e++) {
			let n = {
				mode: o,
				attributes: c
			};
			if (this.serializeUserData(a, n), u.length > 0 && (n.targets = u), a.index !== null) {
				let r = this.getUID(a.index);
				(_[e].start !== void 0 || _[e].count !== void 0) && (r += ":" + _[e].start + ":" + _[e].count), t.attributes.has(r) ? n.indices = t.attributes.get(r) : (n.indices = this.processAccessor(a.index, a, _[e].start, _[e].count), t.attributes.set(r, n.indices)), n.indices === null && delete n.indices;
			}
			let r = await this.processMaterialAsync(g[_[e].materialIndex], a);
			r !== null && (n.material = r), l.push(n);
		}
		h === !0 && a.setIndex(null), s.primitives = l, n.meshes ||= [], await this._invokeAllAsync(function(t) {
			t.writeMesh && t.writeMesh(e, s);
		});
		let v = n.meshes.push(s) - 1;
		return t.meshes.set(i, v), v;
	}
	detectMeshQuantization(e, t) {
		if (this.extensionsUsed[Pa]) return;
		let n;
		switch (t.array.constructor) {
			case Int8Array:
				n = "byte";
				break;
			case Uint8Array:
				n = "unsigned byte";
				break;
			case Int16Array:
				n = "short";
				break;
			case Uint16Array:
				n = "unsigned short";
				break;
			default: return;
		}
		t.normalized && (n += " normalized");
		let r = e.split("_", 1)[0];
		Ma[r] && Ma[r].includes(n) && (this.extensionsUsed[Pa] = !0, this.extensionsRequired[Pa] = !0);
	}
	processCamera(e) {
		let t = this.json;
		t.cameras ||= [];
		let n = e.isOrthographicCamera, r = { type: n ? "orthographic" : "perspective" };
		return n ? r.orthographic = {
			xmag: e.right,
			ymag: e.top,
			zfar: e.far <= 0 ? .001 : e.far,
			znear: e.near < 0 ? 0 : e.near
		} : r.perspective = {
			aspectRatio: e.aspect,
			yfov: Ce.degToRad(e.fov),
			zfar: e.far <= 0 ? .001 : e.far,
			znear: e.near < 0 ? 0 : e.near
		}, e.name !== "" && (r.name = e.type), t.cameras.push(r) - 1;
	}
	processAnimation(e, t) {
		let n = this.json, r = this.nodeMap;
		n.animations ||= [], e = Na.Utils.mergeMorphTargetTracks(e.clone(), t);
		let i = e.tracks, a = [], o = [];
		for (let e = 0; e < i.length; ++e) {
			let n = i[e], s = H.parseTrackName(n.name), c = H.findNode(t, s.nodeName), l = Ia[s.propertyName];
			if (s.objectName === "bones" && (c = c.isSkinnedMesh === !0 ? c.skeleton.getBoneByName(s.objectIndex) : void 0), !c || !l) {
				console.warn("THREE.GLTFExporter: Could not export animation track \"%s\".", n.name);
				continue;
			}
			let u = n.values.length / n.times.length;
			l === Ia.morphTargetInfluences && (u /= c.morphTargetInfluences.length);
			let d;
			n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (d = "CUBICSPLINE", u /= 3) : d = n.getInterpolation() === 2300 ? "STEP" : "LINEAR", o.push({
				input: this.processAccessor(new rn(n.times, 1)),
				output: this.processAccessor(new rn(n.values, u)),
				interpolation: d
			}), a.push({
				sampler: o.length - 1,
				target: {
					node: r.get(c),
					path: l
				}
			});
		}
		let s = {
			name: e.name || "clip_" + n.animations.length,
			samplers: o,
			channels: a
		};
		return this.serializeUserData(e, s), n.animations.push(s), n.animations.length - 1;
	}
	processSkin(e) {
		let t = this.json, n = this.nodeMap, r = t.nodes[n.get(e)], i = e.skeleton;
		if (i === void 0) return null;
		let a = e.skeleton.bones[0];
		if (a === void 0) return null;
		let o = [], s = new Float32Array(i.bones.length * 16), c = new We();
		for (let t = 0; t < i.bones.length; ++t) o.push(n.get(i.bones[t])), c.copy(i.boneInverses[t]), c.multiply(e.bindMatrix).toArray(s, t * 16);
		return t.skins === void 0 && (t.skins = []), t.skins.push({
			inverseBindMatrices: this.processAccessor(new rn(s, 16)),
			joints: o,
			skeleton: n.get(a)
		}), r.skin = t.skins.length - 1;
	}
	async processNodeAsync(e) {
		let t = this.json, n = this.options, r = this.nodeMap;
		if (t.nodes ||= [], e.pivot !== null) return await this._processNodeWithPivotAsync(e);
		let i = {};
		if (n.trs) {
			let t = e.quaternion.toArray(), n = e.position.toArray(), r = e.scale.toArray();
			Wa(t, [
				0,
				0,
				0,
				1
			]) || (i.rotation = t), Wa(n, [
				0,
				0,
				0
			]) || (i.translation = n), Wa(r, [
				1,
				1,
				1
			]) || (i.scale = r);
		} else e.matrixAutoUpdate && e.updateMatrix(), Ka(e.matrix) === !1 && (i.matrix = e.matrix.elements);
		if (e.name !== "" && (i.name = String(e.name)), this.serializeUserData(e, i), e.isMesh || e.isLine || e.isPoints) {
			let t = await this.processMeshAsync(e);
			t !== null && (i.mesh = t);
		} else e.isCamera && (i.camera = this.processCamera(e));
		e.isSkinnedMesh && this.skins.push(e);
		let a = t.nodes.push(i) - 1;
		if (r.set(e, a), e.children.length > 0) {
			let t = [];
			for (let r = 0, i = e.children.length; r < i; r++) {
				let i = e.children[r];
				if (i.visible || n.onlyVisible === !1) {
					let e = await this.processNodeAsync(i);
					e !== null && t.push(e);
				}
			}
			t.length > 0 && (i.children = t);
		}
		return await this._invokeAllAsync(function(t) {
			t.writeNode && t.writeNode(e, i);
		}), a;
	}
	async _processNodeWithPivotAsync(e) {
		let t = this.json, n = this.options, r = this.nodeMap, i = e.pivot, a = {}, o = e.quaternion.toArray(), s = [
			e.position.x + i.x,
			e.position.y + i.y,
			e.position.z + i.z
		], c = e.scale.toArray();
		Wa(o, [
			0,
			0,
			0,
			1
		]) || (a.rotation = o), Wa(s, [
			0,
			0,
			0
		]) || (a.translation = s), Wa(c, [
			1,
			1,
			1
		]) || (a.scale = c), a.extras = { pivot: i.toArray() }, e.name !== "" && (a.name = String(e.name)), this.serializeUserData(e, a);
		let l = t.nodes.push(a) - 1;
		r.set(e, l);
		let u = {}, d = [
			-i.x,
			-i.y,
			-i.z
		];
		if (Wa(d, [
			0,
			0,
			0
		]) || (u.translation = d), e.isMesh || e.isLine || e.isPoints) {
			let t = await this.processMeshAsync(e);
			t !== null && (u.mesh = t);
		} else e.isCamera && (u.camera = this.processCamera(e));
		e.isSkinnedMesh && this.skins.push(e);
		let f = [t.nodes.push(u) - 1];
		if (e.children.length > 0) {
			let t = [];
			for (let r = 0, i = e.children.length; r < i; r++) {
				let i = e.children[r];
				if (i.visible || n.onlyVisible === !1) {
					let e = await this.processNodeAsync(i);
					e !== null && t.push(e);
				}
			}
			t.length > 0 && (u.children = t);
		}
		return a.children = f, await this._invokeAllAsync(function(t) {
			t.writeNode && t.writeNode(e, a);
		}), l;
	}
	async processSceneAsync(e) {
		let t = this.json, n = this.options;
		t.scenes || (t.scenes = [], t.scene = 0);
		let r = {};
		e.name !== "" && (r.name = e.name), t.scenes.push(r);
		let i = [];
		for (let t = 0, r = e.children.length; t < r; t++) {
			let r = e.children[t];
			if (r.visible || n.onlyVisible === !1) {
				let e = await this.processNodeAsync(r);
				e !== null && i.push(e);
			}
		}
		i.length > 0 && (r.nodes = i), this.serializeUserData(e, r);
	}
	async processObjectsAsync(e) {
		let t = new wt();
		t.name = "AuxScene";
		for (let n = 0; n < e.length; n++) t.children.push(e[n]);
		await this.processSceneAsync(t);
	}
	async processInputAsync(e) {
		let t = this.options;
		e = e instanceof Array ? e : [e], await this._invokeAllAsync(function(t) {
			t.beforeParse && t.beforeParse(e);
		});
		let n = [];
		for (let t = 0; t < e.length; t++) e[t] instanceof wt ? await this.processSceneAsync(e[t]) : n.push(e[t]);
		n.length > 0 && await this.processObjectsAsync(n);
		for (let e = 0; e < this.skins.length; ++e) this.processSkin(this.skins[e]);
		if (e.length === 1) for (let n = 0; n < t.animations.length; ++n) this.processAnimation(t.animations[n], e[0]);
		else for (let n = 0; n < e.length; n++) {
			let r = t.animations[n] || [];
			for (let t = 0; t < r.length; ++t) this.processAnimation(r[t], e[n]);
		}
		await this._invokeAllAsync(function(t) {
			t.afterParse && t.afterParse(e);
		});
	}
	async _invokeAllAsync(e) {
		for (let t = 0, n = this.plugins.length; t < n; t++) await e(this.plugins[t]);
	}
}, $a = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_lights_punctual";
	}
	writeNode(e, t) {
		if (!e.isLight) return;
		if (!e.isDirectionalLight && !e.isPointLight && !e.isSpotLight) {
			console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", e);
			return;
		}
		let n = this.writer, r = n.json, i = n.extensionsUsed, a = {};
		e.name && (a.name = e.name), a.color = e.color.toArray(), a.intensity = e.intensity, e.isDirectionalLight ? a.type = "directional" : e.isPointLight ? (a.type = "point", e.distance > 0 && (a.range = e.distance)) : e.isSpotLight && (a.type = "spot", e.distance > 0 && (a.range = e.distance), a.spot = {}, a.spot.innerConeAngle = (1 - e.penumbra) * e.angle, a.spot.outerConeAngle = e.angle), e.decay !== void 0 && e.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."), e.target && (e.target.parent !== e || e.target.position.x !== 0 || e.target.position.y !== 0 || e.target.position.z !== -1) && console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."), i[this.name] || (r.extensions = r.extensions || {}, r.extensions[this.name] = { lights: [] }, i[this.name] = !0);
		let o = r.extensions[this.name].lights;
		o.push(a), t.extensions = t.extensions || {}, t.extensions[this.name] = { light: o.length - 1 };
	}
}, eo = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_unlit";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshBasicMaterial) return;
		let n = this.writer.extensionsUsed;
		t.extensions = t.extensions || {}, t.extensions[this.name] = {}, n[this.name] = !0, t.pbrMetallicRoughness.metallicFactor = 0, t.pbrMetallicRoughness.roughnessFactor = .9;
	}
}, to = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_clearcoat";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.clearcoat === 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (i.clearcoatFactor = e.clearcoat, e.clearcoatMap) {
			let t = {
				index: await n.processTextureAsync(e.clearcoatMap),
				texCoord: e.clearcoatMap.channel
			};
			n.applyTextureTransform(t, e.clearcoatMap), i.clearcoatTexture = t;
		}
		if (i.clearcoatRoughnessFactor = e.clearcoatRoughness, e.clearcoatRoughnessMap) {
			let t = {
				index: await n.processTextureAsync(e.clearcoatRoughnessMap),
				texCoord: e.clearcoatRoughnessMap.channel
			};
			n.applyTextureTransform(t, e.clearcoatRoughnessMap), i.clearcoatRoughnessTexture = t;
		}
		if (e.clearcoatNormalMap) {
			let t = {
				index: await n.processTextureAsync(e.clearcoatNormalMap),
				texCoord: e.clearcoatNormalMap.channel
			};
			e.clearcoatNormalScale.x !== 1 && (t.scale = e.clearcoatNormalScale.x), n.applyTextureTransform(t, e.clearcoatNormalMap), i.clearcoatNormalTexture = t;
		}
		t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, no = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_dispersion";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.dispersion === 0) return;
		let n = this.writer.extensionsUsed, r = {};
		r.dispersion = e.dispersion, t.extensions = t.extensions || {}, t.extensions[this.name] = r, n[this.name] = !0;
	}
}, ro = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_iridescence";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.iridescence === 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (i.iridescenceFactor = e.iridescence, e.iridescenceMap) {
			let t = {
				index: await n.processTextureAsync(e.iridescenceMap),
				texCoord: e.iridescenceMap.channel
			};
			n.applyTextureTransform(t, e.iridescenceMap), i.iridescenceTexture = t;
		}
		if (i.iridescenceIor = e.iridescenceIOR, i.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum, i.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum, e.iridescenceThicknessMap) {
			let t = {
				index: await n.processTextureAsync(e.iridescenceThicknessMap),
				texCoord: e.iridescenceThicknessMap.channel
			};
			n.applyTextureTransform(t, e.iridescenceThicknessMap), i.iridescenceThicknessTexture = t;
		}
		t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, io = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_transmission";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (i.transmissionFactor = e.transmission, e.transmissionMap) {
			let t = {
				index: await n.processTextureAsync(e.transmissionMap),
				texCoord: e.transmissionMap.channel
			};
			n.applyTextureTransform(t, e.transmissionMap), i.transmissionTexture = t;
		}
		t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, ao = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_volume";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.transmission === 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (i.thicknessFactor = e.thickness, e.thicknessMap) {
			let t = {
				index: await n.processTextureAsync(e.thicknessMap),
				texCoord: e.thicknessMap.channel
			};
			n.applyTextureTransform(t, e.thicknessMap), i.thicknessTexture = t;
		}
		e.attenuationDistance !== Infinity && (i.attenuationDistance = e.attenuationDistance), i.attenuationColor = e.attenuationColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, oo = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_ior";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.ior === 1.5) return;
		let n = this.writer.extensionsUsed, r = {};
		r.ior = e.ior, t.extensions = t.extensions || {}, t.extensions[this.name] = r, n[this.name] = !0;
	}
}, so = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_specular";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.specularIntensity === 1 && e.specularColor.equals(La) && !e.specularIntensityMap && !e.specularColorMap) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (e.specularIntensityMap) {
			let t = {
				index: await n.processTextureAsync(e.specularIntensityMap),
				texCoord: e.specularIntensityMap.channel
			};
			n.applyTextureTransform(t, e.specularIntensityMap), i.specularTexture = t;
		}
		if (e.specularColorMap) {
			let t = {
				index: await n.processTextureAsync(e.specularColorMap),
				texCoord: e.specularColorMap.channel
			};
			n.applyTextureTransform(t, e.specularColorMap), i.specularColorTexture = t;
		}
		i.specularFactor = e.specularIntensity, i.specularColorFactor = e.specularColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, co = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_sheen";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.sheen == 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (e.sheenRoughnessMap) {
			let t = {
				index: await n.processTextureAsync(e.sheenRoughnessMap),
				texCoord: e.sheenRoughnessMap.channel
			};
			n.applyTextureTransform(t, e.sheenRoughnessMap), i.sheenRoughnessTexture = t;
		}
		if (e.sheenColorMap) {
			let t = {
				index: await n.processTextureAsync(e.sheenColorMap),
				texCoord: e.sheenColorMap.channel
			};
			n.applyTextureTransform(t, e.sheenColorMap), i.sheenColorTexture = t;
		}
		i.sheenRoughnessFactor = e.sheenRoughness, i.sheenColorFactor = e.sheenColor.toArray(), t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, lo = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_anisotropy";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshPhysicalMaterial || e.anisotropy == 0) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (e.anisotropyMap) {
			let t = { index: await n.processTextureAsync(e.anisotropyMap) };
			n.applyTextureTransform(t, e.anisotropyMap), i.anisotropyTexture = t;
		}
		i.anisotropyStrength = e.anisotropy, i.anisotropyRotation = e.anisotropyRotation, t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, uo = class {
	constructor(e) {
		this.writer = e, this.name = "KHR_materials_emissive_strength";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshStandardMaterial || e.emissiveIntensity === 1) return;
		let n = this.writer.extensionsUsed, r = {};
		r.emissiveStrength = e.emissiveIntensity, t.extensions = t.extensions || {}, t.extensions[this.name] = r, n[this.name] = !0;
	}
}, fo = class {
	constructor(e) {
		this.writer = e, this.name = "EXT_materials_bump";
	}
	async writeMaterialAsync(e, t) {
		if (!e.isMeshStandardMaterial || e.bumpScale === 1 && !e.bumpMap) return;
		let n = this.writer, r = n.extensionsUsed, i = {};
		if (e.bumpMap) {
			let t = {
				index: await n.processTextureAsync(e.bumpMap),
				texCoord: e.bumpMap.channel
			};
			n.applyTextureTransform(t, e.bumpMap), i.bumpTexture = t;
		}
		i.bumpFactor = e.bumpScale, t.extensions = t.extensions || {}, t.extensions[this.name] = i, r[this.name] = !0;
	}
}, po = class {
	constructor(e) {
		this.writer = e, this.name = "EXT_mesh_gpu_instancing";
	}
	writeNode(e, t) {
		if (!e.isInstancedMesh) return;
		let n = this.writer, r = e, i = new Float32Array(r.count * 3), a = new Float32Array(r.count * 4), o = new Float32Array(r.count * 3), s = new We(), c = new L(), l = new we(), u = new L();
		for (let e = 0; e < r.count; e++) r.getMatrixAt(e, s), s.decompose(c, l, u), c.toArray(i, e * 3), l.toArray(a, e * 4), u.toArray(o, e * 3);
		let d = {
			TRANSLATION: n.processAccessor(new rn(i, 3)),
			ROTATION: n.processAccessor(new rn(a, 4)),
			SCALE: n.processAccessor(new rn(o, 3))
		};
		r.instanceColor && (d._COLOR_0 = n.processAccessor(r.instanceColor)), t.extensions = t.extensions || {}, t.extensions[this.name] = { attributes: d }, n.extensionsUsed[this.name] = !0, n.extensionsRequired[this.name] = !0;
	}
};
Na.Utils = {
	insertKeyframe: function(e, t) {
		let n = .001, r = e.getValueSize(), i = new e.TimeBufferType(e.times.length + 1), a = new e.ValueBufferType(e.values.length + r), o = e.createInterpolant(new e.ValueBufferType(r)), s;
		if (e.times.length === 0) {
			i[0] = t;
			for (let e = 0; e < r; e++) a[e] = 0;
			s = 0;
		} else if (t < e.times[0]) {
			if (Math.abs(e.times[0] - t) < n) return 0;
			i[0] = t, i.set(e.times, 1), a.set(o.evaluate(t), 0), a.set(e.values, r), s = 0;
		} else if (t > e.times[e.times.length - 1]) {
			if (Math.abs(e.times[e.times.length - 1] - t) < n) return e.times.length - 1;
			i[i.length - 1] = t, i.set(e.times, 0), a.set(e.values, 0), a.set(o.evaluate(t), e.values.length), s = i.length - 1;
		} else for (let c = 0; c < e.times.length; c++) {
			if (Math.abs(e.times[c] - t) < n) return c;
			if (e.times[c] < t && e.times[c + 1] > t) {
				i.set(e.times.slice(0, c + 1), 0), i[c + 1] = t, i.set(e.times.slice(c + 1), c + 2), a.set(e.values.slice(0, (c + 1) * r), 0), a.set(o.evaluate(t), (c + 1) * r), a.set(e.values.slice((c + 1) * r), (c + 2) * r), s = c + 1;
				break;
			}
		}
		return e.times = i, e.values = a, s;
	},
	mergeMorphTargetTracks: function(e, t) {
		let n = [], r = {}, i = e.tracks;
		for (let e = 0; e < i.length; ++e) {
			let a = i[e], o = H.parseTrackName(a.name), s = H.findNode(t, o.nodeName);
			if (o.propertyName !== "morphTargetInfluences" || o.propertyIndex === void 0) {
				n.push(a);
				continue;
			}
			if (a.createInterpolant !== a.InterpolantFactoryMethodDiscrete && a.createInterpolant !== a.InterpolantFactoryMethodLinear) {
				if (a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) throw Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");
				console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."), a = a.clone(), a.setInterpolation(f);
			}
			let c = s.morphTargetInfluences.length, l = s.morphTargetDictionary[o.propertyIndex];
			if (l === void 0) throw Error("THREE.GLTFExporter: Morph target name not found: " + o.propertyIndex);
			let u;
			if (r[s.uuid] === void 0) {
				u = a.clone();
				let e = new u.ValueBufferType(c * u.times.length);
				for (let t = 0; t < u.times.length; t++) e[t * c + l] = u.values[t];
				u.name = (o.nodeName || "") + ".morphTargetInfluences", u.values = e, r[s.uuid] = u, n.push(u);
				continue;
			}
			let d = a.createInterpolant(new a.ValueBufferType(1));
			u = r[s.uuid];
			for (let e = 0; e < u.times.length; e++) u.values[e * c + l] = d.evaluate(u.times[e]);
			for (let e = 0; e < a.times.length; e++) {
				let t = this.insertKeyframe(u, a.times[e]);
				u.values[t * c + l] = a.values[e];
			}
		}
		return e.tracks = n, e;
	},
	toTypedBufferAttribute: function(e, t) {
		let n = new rn(new t(e.count * e.itemSize), e.itemSize, !1);
		if (!e.normalized && !e.isInterleavedBufferAttribute) return n.array.set(e.array), n;
		for (let t = 0, r = e.count; t < r; t++) for (let r = 0; r < e.itemSize; r++) n.setComponent(t, r, e.getComponent(t, r));
		return n;
	}
};
// src/f14/util.js
var mo = Math.PI / 180, ho = (e, t, n) => e < t ? t : e > n ? n : e, W = (e, t, n) => e + (t - e) * n, go = (e, t) => e < 0 ? -((-e) ** +t) : e ** +t;
function _o(e, t, n) {
	let r = ho((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
}
function vo(e, t, n) {
	let r = Math.max(n - Math.abs(e - t), 0) / n;
	return Math.max(e, t) + r * r * n * .25;
}
function G(e) {
	let t = e.length, n = e.map((e) => e[0]), r = e.map((e) => e[1]);
	if (t === 1) return () => r[0];
	let i = [];
	for (let e = 0; e < t - 1; e++) i.push((r[e + 1] - r[e]) / (n[e + 1] - n[e]));
	let a = Array(t);
	a[0] = i[0], a[t - 1] = i[t - 2];
	for (let e = 1; e < t - 1; e++) a[e] = i[e - 1] * i[e] <= 0 ? 0 : (i[e - 1] + i[e]) / 2;
	for (let e = 0; e < t - 1; e++) {
		if (i[e] === 0) {
			a[e] = 0, a[e + 1] = 0;
			continue;
		}
		let t = a[e] / i[e], n = a[e + 1] / i[e], r = t * t + n * n;
		if (r > 9) {
			let o = 3 / Math.sqrt(r);
			a[e] = o * t * i[e], a[e + 1] = o * n * i[e];
		}
	}
	return (e) => {
		if (e <= n[0]) return r[0];
		if (e >= n[t - 1]) return r[t - 1];
		let i = 0, o = t - 1;
		for (; o - i > 1;) {
			let t = i + o >> 1;
			n[t] <= e ? i = t : o = t;
		}
		let s = n[o] - n[i], c = (e - n[i]) / s, l = c * c, u = l * c;
		return (2 * u - 3 * l + 1) * r[i] + (u - 2 * l + c) * s * a[i] + (-2 * u + 3 * l) * r[o] + (u - l) * s * a[o];
	};
}
function yo(e, t, n = 0) {
	let r = e[0].length, i = e.length, a = [];
	for (let t = 1; t < i; t++) {
		let n = 0;
		for (let i = 0; i < r; i++) {
			let r = e[t][i] - e[t - 1][i];
			n += r * r;
		}
		a.push(Math.sqrt(n));
	}
	let o = a.slice();
	if (n > 0) for (let t = 1; t < i - 1; t++) {
		if (a[t - 1] < 1e-9 || a[t] < 1e-9) continue;
		let i = 0;
		for (let n = 0; n < r; n++) i += (e[t][n] - e[t - 1][n]) / a[t - 1] * ((e[t + 1][n] - e[t][n]) / a[t]);
		let s = Math.acos(ho(i, -1, 1));
		o[t - 1] += .5 * n * s, o[t] += .5 * n * s;
	}
	let s = [0];
	for (let e = 0; e < o.length; e++) s.push(s[e] + o[e]);
	let c = s[s.length - 1], l = [];
	if (c < 1e-12) {
		for (let n = 0; n < t; n++) l.push(e[0].slice());
		return l;
	}
	let u = 0;
	for (let n = 0; n < t; n++) {
		let i = t === 1 ? 0 : n / (t - 1) * c;
		for (; u < s.length - 2 && s[u + 1] < i;) u++;
		let a = s[u + 1] - s[u], o = a > 1e-12 ? ho((i - s[u]) / a, 0, 1) : 0, d = [];
		for (let t = 0; t < r; t++) d.push(e[u][t] + (e[u + 1][t] - e[u][t]) * o);
		l.push(d);
	}
	return l;
}
function bo(e) {
	let t = [];
	for (let n = 0; n < e; n++) t.push(.5 - .5 * Math.cos(Math.PI * n / (e - 1)));
	return t;
}
function K(e, t, n) {
	let r = [];
	for (let i = 0; i < n; i++) r.push(n === 1 ? e : e + (t - e) * i / (n - 1));
	return r;
}
function xo(e, t, n, r) {
	let i = t - e, a = n * r;
	return Math.abs(i) <= a ? t : e + Math.sign(i) * a;
}
// src/f14/geom.js
var q = (e, t, n) => new L(-e, n, t), J = (e) => new L(-e[0], e[2], e[1]);
function So(e, t = {}) {
	let { closed: n = !0, capStart: r = !1, capEnd: i = !1, flip: a = !1, color: o = null } = t, s = e.length, c = e[0].length, l = [], u = [], d = [];
	for (let t = 0; t < s; t++) {
		let n = e[t];
		if (n.length !== c) throw Error(`loft: ring ${t} has ${n.length} points, expected ${c}`);
		for (let e = 0; e < c; e++) if (l.push(n[e][0], n[e][1], n[e][2]), o) {
			let r = o(t, e, n[e]);
			u.push(r[0], r[1], r[2]);
		}
	}
	let f = n ? c : c - 1;
	for (let e = 0; e < s - 1; e++) for (let t = 0; t < f; t++) {
		let n = (t + 1) % c, r = e * c + t, i = e * c + n, o = (e + 1) * c + n, s = (e + 1) * c + t;
		a ? d.push(r, o, i, r, s, o) : d.push(r, i, o, r, o, s);
	}
	let p = (t, n) => {
		let r = e[t], i = l.length / 3, s = 0, p = 0, m = 0;
		for (let e of r) s += e[0], p += e[1], m += e[2];
		s /= c, p /= c, m /= c;
		for (let e of r) if (l.push(e[0], e[1], e[2]), o) {
			let n = o(t, 0, e);
			u.push(n[0], n[1], n[2]);
		}
		if (l.push(s, p, m), o) {
			let e = o(t, 0, [
				s,
				p,
				m
			]);
			u.push(e[0], e[1], e[2]);
		}
		let h = i + c, g = n !== a;
		for (let e = 0; e < f; e++) {
			let t = i + e, n = i + (e + 1) % c;
			g ? d.push(h, t, n) : d.push(h, n, t);
		}
	};
	r && p(0, !1), i && p(s - 1, !0);
	let m = new vn();
	return m.setAttribute("position", new z(l, 3)), o && m.setAttribute("color", new z(u, 3)), m.setIndex(d), m;
}
function Co(e) {
	let t = e.clone(), n = t.attributes.position;
	for (let e = 0; e < n.count; e++) n.setY(e, -n.getY(e));
	let r = t.index.array;
	for (let e = 0; e < r.length; e += 3) {
		let t = r[e + 1];
		r[e + 1] = r[e + 2], r[e + 2] = t;
	}
	return t;
}
function wo(e, t = null) {
	let n = e.attributes.position, r = new Float32Array(n.count * 3), i = t ? t[0] : 0, a = t ? t[1] : 0, o = t ? t[2] : 0;
	for (let e = 0; e < n.count; e++) {
		let t = n.getX(e), s = n.getY(e), c = n.getZ(e);
		r[3 * e] = t, r[3 * e + 1] = s, r[3 * e + 2] = c, n.setXYZ(e, -(t - i), c - o, s - a);
	}
	return e.setAttribute("aRef", new rn(r, 3)), e.computeVertexNormals(), e.computeBoundingSphere(), e.computeBoundingBox(), e;
}
function To(e, t) {
	let n = ho(e, 0, 1);
	return 5 * t * (.2969 * Math.sqrt(n) - .126 * n - .3516 * n * n + .2843 * n ** 3 - .1036 * n ** 4);
}
var Eo = (e, t) => 4 * t * e * (1 - e);
function Do(e, t, n, r, i = {}) {
	let { le: a, te: o, up: s, t: c, m: l = 0, minThick: u = .004 } = e, d = t > 1e-6, f = n < 1 - 1e-6 ? i.faceN ?? 3 : 1, p = Math.hypot(o[0] - a[0], o[1] - a[1], o[2] - a[2]), m = (e, t) => {
		let n = Math.max(To(e, c) * p, e > .999 ? u * .5 : 0), r = Eo(e, l) * p + t * n;
		return [
			a[0] + (o[0] - a[0]) * e + s[0] * r,
			a[1] + (o[1] - a[1]) * e + s[1] * r,
			a[2] + (o[2] - a[2]) * e + s[2] * r
		];
	}, h = (e, t, n, r) => {
		for (let i = 1; i < r; i++) {
			let a = i / r;
			e.push([
				t[0] + (n[0] - t[0]) * a,
				t[1] + (n[1] - t[1]) * a,
				t[2] + (n[2] - t[2]) * a
			]);
		}
	}, g = bo(r).map((e) => t + (n - t) * e), _ = [];
	for (let e = 0; e < g.length; e++) _.push(m(g[e], 1));
	let v = m(n, 1), y = m(n, -1);
	_.push(v), h(_, v, y, f), _.push(y), _.push(y.slice());
	for (let e = g.length - 2; e >= +!d; e--) _.push(m(g[e], -1));
	if (d) {
		let e = m(t, -1), n = m(t, 1);
		_.push(e), h(_, e, n, i.faceN ?? 3), _.push(n);
	}
	return _;
}
function Oo(e, t, n, r, i, a, o, s, c = -Math.PI / 2) {
	let l = [], u = 2 / o;
	for (let o = 0; o < s; o++) {
		let d = c + o / s * Math.PI * 2, f = Math.cos(d), p = Math.sin(d), m = t + r * Math.sign(f) * Math.abs(f) ** +u, h = n + (p >= 0 ? i : a) * Math.sign(p) * Math.abs(p) ** +u;
		l.push([
			e,
			m,
			h
		]);
	}
	return l;
}
function ko(e, t, n = null, r = "") {
	wo(e, n);
	let i = new B(e, t);
	return n && i.position.copy(J(n)), i.name = r, i.castShadow = !0, i.receiveShadow = !0, i;
}
function Ao(e, t, n, r = null, i = 1) {
	let a = new R(), o = J(t);
	r && o.sub(J(r)), a.position.copy(o);
	let s = new L(-n[0], n[2], n[1]).normalize();
	return a.userData.axis = s, a.userData.side = i, a.userData.set = (e) => a.quaternion.setFromAxisAngle(s, i === 1 ? e : -e), e.add(a), a;
}
function jo(e, t, n = null, r = "") {
	wo(e, n);
	let i = new B(e, t);
	return i.name = r, i.castShadow = !0, i.receiveShadow = !0, i;
}
var Mo = (e) => [
	e[0],
	-e[1],
	e[2]
], No = {
	min: 20,
	max: 68,
	over: 75,
	bomb: 55,
	ref: 20
}, Po = {
	length: 19.1,
	height: 4.88,
	groundW: -2.25,
	centerS: 9.55
}, Fo = {
	pivot: [
		11.2,
		2.71,
		0
	],
	L0: [10.44, 2.45],
	T0: [13.03, 1.9],
	LT: [12.93, 9.29],
	TT: [14.15, 9.77],
	tRoot: .09,
	tTip: .075,
	camber: .008,
	slat: {
		x1: .14,
		segs: [[.168, .57], [.57, .975]]
	},
	flap: {
		x0: .73,
		segs: [[.07, .48], [.48, .9]]
	},
	spoiler: {
		x0: .58,
		x1: .72,
		segs: [
			[.2, .33],
			[.33, .46],
			[.46, .6],
			[.6, .73]
		]
	}
};
function Io(e) {
	let t = Fo;
	return {
		le: [
			W(t.L0[0], t.LT[0], e),
			W(t.L0[1], t.LT[1], e),
			0
		],
		te: [
			W(t.T0[0], t.TT[0], e),
			W(t.T0[1], t.TT[1], e),
			0
		],
		up: [
			0,
			0,
			1
		],
		t: W(t.tRoot, t.tTip, e),
		m: t.camber
	};
}
function Lo(e, t) {
	let n = Io(e);
	return [W(n.le[0], n.te[0], t), W(n.le[1], n.te[1], t)];
}
function Ro(e, t) {
	let n = Fo, r = [n.LT[0] - n.L0[0], n.LT[1] - n.L0[1]], i = [n.TT[0] - n.T0[0], n.TT[1] - n.T0[1]], a = (t - n.L0[1]) / r[1], o = .5;
	for (let s = 0; s < 25; s++) {
		let s = [n.L0[0] + a * r[0], n.L0[1] + a * r[1]], c = [n.T0[0] + a * i[0], n.T0[1] + a * i[1]], l = s[0] + o * (c[0] - s[0]) - e, u = s[1] + o * (c[1] - s[1]) - t, d = r[0] + o * (i[0] - r[0]), f = c[0] - s[0], p = r[1] + o * (i[1] - r[1]), m = c[1] - s[1], h = d * m - f * p, g = (l * m - f * u) / h, _ = (d * u - p * l) / h;
		if (a -= g, o -= _, Math.abs(g) + Math.abs(_) < 1e-10) break;
	}
	return [a, o];
}
function zo(e, t, n, r = 1) {
	let i = Fo.pivot, a = (n - No.ref) * mo, o = e - i[0], s = r * t - i[1], c = Math.cos(a), l = Math.sin(a);
	return [i[0] + o * c - s * l, i[1] + o * l + s * c];
}
function Bo(e, t) {
	let [n, r] = Ro(e, t);
	if (n < 0 || n > 1 || r < 0 || r > 1) return null;
	let i = Io(n), a = Math.hypot(i.te[0] - i.le[0], i.te[1] - i.le[1]), o = To(r, i.t) * a, s = Eo(r, i.m) * a;
	return [s + o, s - o];
}
function Vo(e, t, n = .5) {
	let r = -Infinity, i = Infinity;
	for (let a = No.min; a <= No.over + 1e-9; a += n) {
		let [n, o] = zo(e, t, a), s = Bo(n, o);
		s && (r = Math.max(r, s[0]), i = Math.min(i, s[1]));
	}
	return r === -Infinity ? null : [r, i];
}
var Ho = {
	root: {
		y: 2.36,
		le: 15.416,
		te: 17.975
	},
	tip: {
		y: 4.985,
		le: 18.3,
		te: 19.05
	},
	w: -.38,
	pivot: [
		16.65,
		0,
		-.38
	],
	tRoot: .055,
	tTip: .04
}, Uo = {
	y: 1.6,
	baseW: .4,
	cant: 5 * mo,
	sections: [
		[
			-.12,
			14.9,
			18.4
		],
		[
			0,
			15.1,
			18.42
		],
		[
			.3,
			15.6,
			18.47
		],
		[
			2.23,
			17.81,
			18.89
		]
	],
	rudder: {
		x0: .72,
		h0: .32,
		h1: 2
	},
	tRoot: .05,
	tTip: .04
};
function Wo(e) {
	let t = Uo.sections;
	for (let n = 0; n < t.length - 1; n++) if (e <= t[n + 1][0] || n === t.length - 2) {
		let r = (e - t[n][0]) / (t[n + 1][0] - t[n][0]);
		return [W(t[n][1], t[n + 1][1], r), W(t[n][2], t[n + 1][2], r)];
	}
	return [t[0][1], t[0][2]];
}
function Go(e) {
	return [Uo.y + Math.sin(Uo.cant) * e, Uo.baseW + Math.cos(Uo.cant) * e];
}
var Ko = {
	nose: {
		trunnion: [
			4.3,
			0,
			-.8
		],
		axle: [
			4.18,
			0,
			-1.97
		],
		wheelR: .28,
		wheelW: .17,
		track: .13
	},
	main: {
		trunnion: [
			11.05,
			2.2,
			-.3
		],
		axle: [
			11.2,
			2.5,
			-1.775
		],
		wheelR: .475,
		wheelW: .28
	}
}, qo = {
	s0: 16.95,
	s1: 17.6,
	s2: 18.4,
	y: 1.45,
	w: -.42,
	r: .6,
	exitDry: .5,
	exitAB: .58
}, Jo = [
	[
		1.8,
		.476,
		.219,
		-.757,
		-.31,
		2,
		2.1
	],
	[
		2.1,
		.535,
		.295,
		-.787,
		-.28,
		2,
		2.1
	],
	[
		2.45,
		.6,
		.38,
		-.82,
		-.25,
		2,
		2.2
	],
	[
		3.35,
		.7,
		.53,
		-.9,
		-.2,
		2.5,
		2.5
	],
	[
		4.2,
		.76,
		.55,
		-.95,
		-.15,
		3.2,
		2.8
	],
	[
		5.5,
		.78,
		.55,
		-.97,
		-.12,
		3.6,
		3
	],
	[
		6.5,
		.78,
		.55,
		-.95,
		-.08,
		3.6,
		3
	],
	[
		7.6,
		.72,
		.62,
		-.78,
		0,
		3.2,
		3
	],
	[
		8.5,
		.62,
		.92,
		-.6,
		.1,
		2.6,
		2.5
	],
	[
		9.5,
		.56,
		.88,
		-.45,
		.16,
		2.4,
		2.5
	],
	[
		11,
		.54,
		.8,
		-.45,
		.16,
		2.4,
		2.5
	],
	[
		13.5,
		.5,
		.62,
		-.45,
		.16,
		2.3,
		2.5
	],
	[
		15.5,
		.48,
		.45,
		-.47,
		.1,
		2.2,
		2.5
	],
	[
		16.8,
		.5,
		.15,
		-.52,
		-.15,
		2.4,
		2.5
	],
	[
		17.6,
		.45,
		-.2,
		-.52,
		-.36,
		2.6,
		2.5
	],
	[
		18,
		.3,
		-.3,
		-.48,
		-.4,
		2.6,
		2.5
	]
], Yo = (e) => G(Jo.map((t) => [t[0], t[e]])), Xo = Yo(1), Zo = Yo(2), Qo = Yo(3), $o = Yo(4), es = Yo(5), ts = Yo(6);
function ns(e) {
	if (e < 1.8) {
		let t = Math.max(e, 0) / 2.45;
		return {
			a: .6 * t ** .75,
			top: -.45 + .83 * t ** .7,
			bot: -.45 - .37 * t ** .6,
			wMax: -.45 + .2 * t ** .7,
			nTop: 2,
			nBot: 2.1
		};
	}
	return {
		a: Xo(e),
		top: Zo(e),
		bot: Qo(e),
		wMax: $o(e),
		nTop: es(e),
		nBot: ts(e)
	};
}
function rs(e, t) {
	let n = ns(e), r = Math.min(Math.abs(t) / n.a, 1);
	return n.wMax + (n.top - n.wMax) * (1 - r ** +n.nTop) ** (1 / n.nTop);
}
function is(e, t) {
	let n = ns(e), r = Math.min(Math.abs(t) / n.a, 1);
	return n.wMax - (n.wMax - n.bot) * (1 - r ** +n.nBot) ** (1 / n.nBot);
}
function as(e, t) {
	let n = ns(e), r = [];
	for (let e = 0; e <= 240; e++) {
		let t = e / 240 * Math.PI * 2, i = Math.cos(t), a = Math.sin(t), o = i >= 0 ? n.nTop : n.nBot, s = -n.a * go(a, 2 / o), c = i >= 0 ? n.wMax + (n.top - n.wMax) * go(i, 2 / o) : n.wMax + (n.wMax - n.bot) * go(i, 2 / o);
		r.push([s, c]);
	}
	let i = yo(r, t + 1, .25);
	return i.pop(), i.map(([t, n]) => [
		e,
		t,
		n
	]);
}
function os() {
	let e = [];
	for (let t = 0; t <= 34; t++) e.push(2.45 * (t / 34) ** 1.7);
	for (let t of K(2.45, 18, 112).slice(1)) e.push(t);
	return So(e.map((e) => as(e, 88)), {
		closed: !0,
		capEnd: !0
	});
}
var ss = [6.1, 1.74], cs = [10.82, 3.5], ls = [12.25, 2.33], Y = {
	yc: G([
		[6.1, 1.32],
		[7.5, 1.33],
		[11, 1.45],
		[17, 1.45]
	]),
	ay: G([
		[6.1, .42],
		[7.5, .44],
		[11, .66],
		[15.5, .66],
		[17, .6]
	]),
	wc: G([
		[6.1, -.6],
		[7.5, -.58],
		[11, -.42],
		[17, -.42]
	]),
	awT: G([
		[6.1, .5],
		[7.5, .52],
		[11, .55],
		[13.5, .72],
		[15.5, .72],
		[17, .6]
	]),
	awB: G([
		[6.1, .5],
		[7.5, .52],
		[11, .75],
		[15.5, .75],
		[17, .62]
	]),
	n: G([
		[6.1, 6],
		[7.5, 5],
		[11, 2.6],
		[14, 2.2],
		[17, 2]
	])
};
function us(e, t, n = 0) {
	let r = Y.yc(e), i = Y.ay(e) - n, a = Y.wc(e), o = Y.n(e), s = Math.cos(t), c = Math.sin(t), l = 2 / o;
	return [r + i * go(s, l), a + (c >= 0 ? Y.awT(e) - n : Y.awB(e) - n) * go(c, l)];
}
function ds(e, t) {
	let n = Y.yc(e), r = Y.ay(e), i = Y.n(e), a = Math.abs((t - n) / r);
	return a >= 1 ? -10 : Y.wc(e) + Y.awT(e) * (1 - a ** +i) ** (1 / i);
}
function fs(e) {
	return e <= cs[0] ? ss[1] + (e - ss[0]) * (cs[1] - ss[1]) / (cs[0] - ss[0]) : e <= ls[0] ? cs[1] + (e - cs[0]) * (ls[1] - cs[1]) / (ls[0] - cs[0]) : W(2.33, Y.yc(e) + Y.ay(e), _o(16, 17, e));
}
var ps = G([
	[6.1, -.1],
	[10.82, 0],
	[12.25, -.03],
	[16, -.08],
	[17, -.42]
]), ms = G([
	[6.1, .6],
	[10.82, 1],
	[12.25, .6],
	[16, .4],
	[17, .05]
]), hs = G([
	[6.1, -.1],
	[7, -.08],
	[9, .18],
	[14, .18],
	[15.5, .1],
	[16.8, -.1],
	[17, -.2]
]), gs = G([
	[6.1, -.1],
	[7, -.08],
	[9, .18],
	[12.5, .18],
	[15, .08],
	[16.5, -.05],
	[17, -.42]
]), _s = G([
	[6.1, -.1],
	[7, -.13],
	[9, -.22],
	[16, -.24],
	[17, -.42]
]), vs = G([
	[6.1, .9],
	[7, .9],
	[8.5, .3],
	[17, .3]
]), ys = G([
	[6.1, -.15],
	[7.3, -.2],
	[8.3, -.5],
	[15, -.5],
	[17, -.55]
]), bs = G([
	[12.6, .15],
	[16, .15],
	[17, 0]
]), xs = 6.1, Ss = .01, Cs = null;
function ws() {
	let e = Math.round(6.800000000000001 / Ss) + 1, t = new Float32Array(e);
	for (let n = 0; n < e; n++) {
		let e = xs + n * Ss, r = ps(e), i = Vo(e, fs(e), .5);
		t[n] = i ? Math.max(i[0] - r, r - i[1], 0) + .014 : 0;
	}
	let n = new Float32Array(e);
	for (let r = 0; r < e; r++) {
		let e = 0;
		for (let n = Math.max(0, r - 6); n <= Math.min(680, r + 6); n++) e = Math.max(e, t[n]);
		n[r] = e;
	}
	Cs = n;
}
function Ts(e) {
	Cs || ws();
	let t = (e - xs) / Ss;
	if (t <= 0 || t >= Cs.length - 1) return 0;
	let n = Math.floor(t);
	return W(Cs[n], Cs[n + 1], t - n);
}
function Es(e) {
	let t = Ts(e);
	return e < 12.3 ? t : Math.max(W(t, bs(e), _o(12.3, 12.6, e)), e < 12.9 ? t : 0);
}
function Ds(e, t) {
	let n = Y.yc(e);
	return W(hs(e), gs(e), _o(n - .4, n + .4, t));
}
function Os(e, t) {
	let n = Es(e), r = fs(e) - .8 * n, i = vo(Ds(e, t), ds(e, t), .05), a = ho((r - t) / ms(e), 0, 1), o = 1 - (1 - a) * (1 - a), s = ps(e) + n;
	return s + (i - s) * o;
}
function ks(e, t) {
	let n = Es(e), r = ho((fs(e) - .8 * n - t) / ms(e), 0, 1), i = 1 - (1 - r) * (1 - r), a = ps(e) - n;
	return a + (_s(e) - a) * i;
}
function As(e, t) {
	let n = Y.wc(e), r = Y.n(e), i = ho((t - n) / (t >= n ? Y.awT(e) : Y.awB(e)), -1, 1);
	return Math.PI - Math.asin(ho(go(i, r / 2), -1, 1));
}
function js(e) {
	let t = (t) => {
		let [n, r] = us(e, t);
		return r - ks(e, n);
	}, n = -Math.PI / 2;
	for (let e = 1; e <= 120; e++) {
		let r = -Math.PI / 2 + e / 120 * Math.PI;
		if (t(r) >= -.002) {
			let e = n, i = r;
			for (let n = 0; n < 30; n++) {
				let n = .5 * (e + i);
				t(n) >= -.002 ? i = n : e = n;
			}
			return i;
		}
		n = r;
	}
	return Math.PI / 2;
}
var Ms = (e, t) => ho((-.1 - t) * .65, 0, .65) * (1 - _o(6.1, 7.4, e)), Ns = {
	top: 40,
	hidden: 4,
	roof: 6,
	duct: 48,
	under: 18,
	edge: 7
};
function Ps(e) {
	let t = Ns, n = Es(e), r = ps(e), i = fs(e) - .8 * n, a = vs(e), o = ys(e), s = As(e, o), [c, l] = us(e, s), u = W(c, 0, _o(7.3, 8.3, e)), d = js(e), [f, p] = us(e, d), m = [], h = [];
	for (let t = 0; t <= 260; t++) {
		let n = i + (a - i) * (t / 260);
		h.push([n, Os(e, n)]);
	}
	m.push(...yo(h, t.top, 6));
	let g = m[m.length - 1];
	for (let e = 0; e < t.hidden; e++) {
		let n = e / (t.hidden - 1);
		m.push([W(g[0], u, n), W(g[1], o, n)]);
	}
	for (let e = 0; e < t.roof; e++) {
		let n = e / (t.roof - 1);
		m.push([W(u, c, n), W(o, l, n)]);
	}
	let _ = [], v = d + Math.PI * 2;
	for (let t = 0; t <= 300; t++) _.push(us(e, W(s, v, t / 300)));
	m.push(...yo(_, t.duct, 1.5));
	let y = Math.max(i, f), b = [];
	for (let t = 0; t <= 160; t++) {
		let n = f + (y - f) * (t / 160);
		b.push([n, t === 0 ? p : ks(e, n)]);
	}
	m.push(...yo(b, t.under, 6));
	for (let e = 1; e <= t.edge; e++) {
		let a = -Math.PI / 2 + e / (t.edge + 1) * Math.PI;
		m.push([i + .8 * n * Math.cos(a), r + n * Math.sin(a)]);
	}
	return m.map(([t, n]) => [
		e + Ms(e, n),
		t,
		n
	]);
}
function Fs() {
	let e = [], t = (t, n, r) => {
		let i = K(t, n, r);
		for (let t of i) (!e.length || t > e[e.length - 1] + 1e-6) && e.push(t);
	};
	return t(6.1, 7.4, 22), t(7.4, cs[0], 44), t(cs[0], ls[0], 22), t(ls[0], 17, 60), e;
}
function Is() {
	let e = Fs().map((e) => Ps(e)), t = So(e, {
		closed: !0,
		capEnd: !0
	});
	return {
		starboard: t,
		port: Co(t),
		frontRing: e[0]
	};
}
var Ls = .035;
function Rs(e, t) {
	let n = [];
	for (let t = 0; t <= 300; t++) n.push(us(e, -Math.PI / 2 + t / 300 * Math.PI * 2, Ls));
	let r = yo(n, t + 1, 1.2);
	return r.pop(), r.map(([t, n]) => [
		e + Ms(e, n),
		t,
		n
	]);
}
function zs(e) {
	let t = 0, n = Infinity, r = e.reduce((e, t) => e + t[1], 0) / e.length;
	for (let i = 0; i < e.length; i++) {
		let a = e[i][2] + Math.abs(e[i][1] - r) * .5;
		a < n && (n = a, t = i);
	}
	return e.slice(t).concat(e.slice(0, t));
}
function Bs(e) {
	let t = K(6.1, 10.2, 34), n = t.map((e) => Rs(e, 96)), r = (e) => {
		let n = W(.82, .05, (e / (t.length - 1)) ** .55);
		return [
			n,
			n,
			n * 1.02
		];
	}, i = So(n, {
		closed: !0,
		flip: !0,
		capEnd: !0,
		color: (e) => r(e)
	}), a = yo(e.concat([e[0]]), 97, .5);
	a.pop();
	let o = zs(a), s = zs(n[0]);
	return {
		duct: i,
		lip: So([
			o,
			o.map((e, t) => {
				let n = s[t];
				return [
					Math.min(e[0], n[0]) - .018,
					(e[1] + n[1]) / 2,
					(e[2] + n[2]) / 2
				];
			}),
			s
		], {
			closed: !0,
			flip: !0
		})
	};
}
var Vs = [
	[
		16.6,
		.82,
		.28
	],
	[
		17.2,
		.74,
		.2
	],
	[
		18,
		.6,
		.12
	],
	[
		18.7,
		.42,
		.07
	],
	[
		19,
		.25,
		.045
	],
	[
		19.1,
		.06,
		.02
	]
], Hs = {
	hw: G(Vs.map((e) => [e[0], e[1]])),
	ht: G(Vs.map((e) => [e[0], e[2]])),
	wc: -.4,
	n: 3.2
};
function Us(e, t) {
	let n = Math.min(Math.abs(t) / Hs.hw(e), 1);
	return Hs.ht(e) * (1 - n ** +Hs.n) ** (1 / Hs.n);
}
function Ws() {
	let e = Hs;
	return So(K(16.6, 19.1, 40).map((t) => Oo(t, 0, e.wc, e.hw(t), e.ht(t), e.ht(t), e.n, 48)), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
}
function Gs() {
	let e = G([
		[14.6, .02],
		[15.2, .13],
		[17.4, .13],
		[18, .08],
		[18.15, .02]
	]), t = G([
		[14.6, .03],
		[15.2, .19],
		[17.4, .19],
		[18, .12],
		[18.15, .03]
	]), n = So(K(14.6, 18.15, 36).map((n) => Oo(n, 2.22, -.25, e(n), t(n), t(n), 2.2, 32)), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
	return {
		starboard: n,
		port: Co(n)
	};
}
var Ks = 1.6;
function qs() {
	let e = G([
		[13.9, .02],
		[14.8, .12],
		[15.4, .15],
		[18.2, .13],
		[18.55, .03]
	]), t = G([
		[13.9, .2],
		[15, .33],
		[15.4, .41],
		[18.4, .41],
		[18.55, .3]
	]), n = .02, r = So(K(13.9, 18.55, 44).map((r) => {
		let i = t(r);
		return Oo(r, Ks, (i + n) / 2, e(r), (i - n) / 2, (i - n) / 2, 2.6, 28);
	}), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
	return {
		starboard: r,
		port: Co(r)
	};
}
// node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function Js(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new vn();
	c.morphTargetsRelative = s;
	let l = 0;
	for (let u = 0; u < e.length; ++u) {
		let d = e[u], f = 0, p = 0;
		if (n !== (d.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
		for (let e in d.attributes) {
			if (!r.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure \"" + e + "\" attribute exists among all geometries, or in none of them."), null;
			a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++;
		}
		if (f !== r.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of attributes."), null;
		if (s !== d.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
		for (let t in d.morphAttributes) {
			if (!i.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ".  .morphAttributes must be consistent throughout all geometries."), null;
			if (d.morphAttributes[t].length !== e[0].morphAttributes[t].length) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have the same number of morph targets for the \"" + t + "\" morph attribute."), null;
			o[t] === void 0 && (o[t] = []), o[t].push(d.morphAttributes[t]), p++;
		}
		if (p !== i.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of morph attributes."), null;
		if (t) {
			let e;
			if (n) e = d.index.count;
			else if (d.attributes.position !== void 0) e = d.attributes.position.count;
			else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". The geometry must have either an index or a position attribute"), null;
			c.addGroup(l, e, u), l += e;
		}
	}
	if (n) {
		let t = 0, n = [];
		for (let r = 0; r < e.length; ++r) {
			let i = e[r].index;
			for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
			t += e[r].attributes.position.count;
		}
		c.setIndex(n);
	}
	for (let e in a) {
		let t = Ys(a[e]);
		if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
		c.setAttribute(e, t);
	}
	for (let e in o) {
		let t = o[e][0].length;
		if (t !== 0) {
			c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
			for (let n = 0; n < t; ++n) {
				let t = [];
				for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
				let r = Ys(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function Ys(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new rn(o, n, r), c = 0;
	for (let t = 0; t < e.length; ++t) {
		let r = e[t];
		if (r.isInterleavedBufferAttribute) {
			let e = c / n;
			for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
				let n = r.getComponent(t, i);
				s.setComponent(t + e, i, n);
			}
		} else o.set(r.array, c);
		c += r.count * n;
	}
	return i !== void 0 && (s.gpuType = i), s;
}
// src/f14/wing.js
function Xs(e, t, n, r, i, a) {
	return So(K(e, t, i).map((e) => Do(Io(e), n, r, a)), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
}
function Zs(e, t, n, r = 0) {
	let i = Io(e), a = Math.hypot(i.te[0] - i.le[0], i.te[1] - i.le[1]), o = To(t, i.t) * a, s = Eo(t, i.m) * a, [c, l] = Lo(e, t);
	return [
		c,
		l,
		s + n * o + r
	];
}
function Qs(e, t, n, r) {
	return So(K(e, t, 5).map((e) => {
		let t = K(n, r, 7), i = t.map((t) => Zs(e, t, 1, .004)), a = t.slice().reverse().map((t) => Zs(e, t, 1, -.012));
		return [
			...i,
			i[i.length - 1],
			a[0],
			...a,
			a[a.length - 1],
			i[0]
		];
	}), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
}
var $s = (e, t) => t === 1 ? e : Co(e), ec = (e, t) => t === 1 ? e : Mo(e);
function tc(e, t) {
	let n = Fo, r = ec(n.pivot, e), i = new R();
	i.name = e === 1 ? "wingR" : "wingL", i.position.copy(J(r));
	let a = Js([
		Xs(0, 1, .14, n.flap.x0, 30, 22),
		Xs(0, n.slat.segs[0][0], 0, .14, 6, 14),
		Xs(n.slat.segs[1][1], 1, 0, .14, 3, 14),
		Xs(0, n.flap.segs[0][0], n.flap.x0, 1, 4, 12),
		Xs(n.flap.segs[1][1], 1, n.flap.x0, 1, 5, 12)
	]);
	i.add(jo($s(a, e), t.wing, r, "wingFixed"));
	let o = {
		slats: [],
		flaps: [],
		spoilers: []
	};
	for (let [a, s] of n.slat.segs) {
		let n = Zs(a, .24, -1, -.05), c = Zs(s, .24, -1, -.05), l = ec(n, e), u = Ao(i, l, ec([
			c[0] - n[0],
			c[1] - n[1],
			c[2] - n[2]
		], e), r, e);
		u.add(jo($s(Xs(a, s, 0, .14, 10, 14), e), t.wing, l, "slat")), o.slats.push(u);
	}
	for (let [a, s] of n.flap.segs) {
		let c = Zs(a, .775, -1, -.09), l = Zs(s, .775, -1, -.09), u = ec(c, e), d = Ao(i, u, ec([
			l[0] - c[0],
			l[1] - c[1],
			l[2] - c[2]
		], e), r, e);
		d.add(jo($s(Xs(a, s, n.flap.x0, 1, 10, 12), e), t.wing, u, "flap")), o.flaps.push(d);
	}
	for (let [a, s] of n.spoiler.segs) {
		let c = Zs(a, n.spoiler.x0, 1, 0), l = Zs(s, n.spoiler.x0, 1, 0), u = ec(c, e), d = Ao(i, u, ec([
			l[0] - c[0],
			l[1] - c[1],
			l[2] - c[2]
		], e), r, e), f = jo($s(Qs(a, s, n.spoiler.x0, n.spoiler.x1), e), t.wing, u, "spoiler");
		d.add(f), d.visible = !1, o.spoilers.push(d);
	}
	let s = J(ec(Zs(.995, .35, 1, -.02), e)).sub(J(r)), c = e === 1 ? t.navGreen : t.navRed, l = new B(new Ai(.035, 12, 8), c);
	return l.position.copy(s).add(new L(0, 0, .05 * e)), l.scale.set(1.6, .8, 1), i.add(l), {
		group: i,
		hinges: o,
		side: e
	};
}
// src/f14/tail.js
var nc = (e, t) => t === 1 ? e : Co(e), rc = (e, t) => t === 1 ? e : Mo(e);
function ic(e) {
	let t = Ho, n = (e - t.root.y) / (t.tip.y - t.root.y);
	return {
		le: [
			W(t.root.le, t.tip.le, n),
			e,
			t.w
		],
		te: [
			W(t.root.te, t.tip.te, n),
			e,
			t.w
		],
		up: [
			0,
			0,
			1
		],
		t: W(t.tRoot, t.tTip, n),
		m: 0
	};
}
function ac(e, t, n) {
	let r = Ho, i = So(K(r.root.y, r.tip.y, 14).map((e) => Do(ic(e), 0, 1, 18)), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	}), a = rc([
		r.pivot[0],
		r.root.y,
		r.pivot[2]
	], e), o = Ao(t, a, rc([
		0,
		1,
		0
	], e), null, e);
	o.add(jo(nc(i, e), n.body, a, "stab"));
	let s = new B(new lr(.1, .1, .08, 20), n.metalDark);
	return s.rotation.x = Math.PI / 2, s.position.set(0, 0, -.02 * e), o.add(s), o;
}
var oc = [
	0,
	-Math.cos(Uo.cant),
	Math.sin(Uo.cant)
];
function sc(e) {
	let [t, n] = Wo(e), [r, i] = Go(e), a = Math.max(0, Math.min(1, e / 2.23));
	return {
		le: [
			t,
			r,
			i
		],
		te: [
			n,
			r,
			i
		],
		up: oc,
		t: W(Uo.tRoot, Uo.tTip, a),
		m: 0
	};
}
function cc(e, t, n, r) {
	return So(e.map((e) => Do(sc(e), t, n, r)), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
}
function lc(e, t, n) {
	let r = Uo.rudder, i = K(-.12, .3, 8).concat([r.h0]), a = K(r.h0, r.h1, 14), o = K(r.h1, 2.23, 4), s = Js([
		cc(i, 0, 1, 22),
		cc(a, 0, r.x0, 20),
		cc(o, 0, 1, 22)
	]), c = new R();
	t.add(c), c.add(jo(nc(s, e), n.body, null, "fin"));
	let l = uc(r.h0, r.x0), u = uc(r.h1, r.x0), d = rc(l, e), f = Ao(c, d, rc([
		u[0] - l[0],
		u[1] - l[1],
		u[2] - l[2]
	], e), null, e);
	f.add(jo(nc(cc(a, r.x0, 1, 10), e), n.body, d, "rudder"));
	let p = 2.23, [m, h] = Wo(p), [g, _] = Go(p), v = new B(new sr(.035, h - m - .3, 4, 10), n.body);
	v.rotation.z = Math.PI / 2, v.position.copy(J([
		(m + h) / 2 + .06,
		e * g,
		_ + .005
	])), v.castShadow = !0, c.add(v);
	let y = new B(new Ai(.028, 10, 8), n.navWhite);
	return y.position.copy(J([
		h + .02,
		e * g,
		_ - .05
	])), c.add(y), {
		group: c,
		rudder: f
	};
}
function uc(e, t) {
	let [n, r] = Wo(e), [i, a] = Go(e);
	return [
		W(n, r, t),
		i,
		a
	];
}
function dc(e, t, n) {
	let r = {
		le: 13.77,
		te: 16.9,
		y: 1.43,
		w: -1
	}, i = {
		le: 15.8,
		te: 16.9,
		y: 1.66,
		w: -1.55
	}, a = [
		0,
		i.y - r.y,
		i.w - r.w
	], o = Math.hypot(a[1], a[2]), s = [
		0,
		a[1] / o,
		a[2] / o
	], c = [
		0,
		-s[2],
		s[1]
	], l = jo(nc(So(K(0, 1, 6).map((e) => {
		let t = W(r.y, i.y, e), n = W(r.w, i.w, e), a = W(r.le, i.le, e), o = W(r.te, i.te, e), s = .05 / (o - a);
		return Do({
			le: [
				a,
				t,
				n
			],
			te: [
				o,
				t,
				n
			],
			up: c,
			t: Math.min(s * 1.6, .06),
			m: 0
		}, 0, 1, 12);
	}), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	}), e), n.body, null, "ventral");
	return t.add(l), l;
}
// src/f14/gear.js
function fc(e, t) {
	let n = e * .6, r = [];
	r.push(new I(n, -t * .46));
	for (let n = 0; n <= 14; n++) {
		let i = -Math.PI / 2 + n / 14 * Math.PI, a = t * .5, o = t * .42;
		r.push(new I(e - o + o * Math.cos(i), a * Math.sin(i)));
	}
	r.push(new I(n, t * .46));
	let i = new Di(r, 40);
	return i.rotateX(Math.PI / 2), i;
}
function pc(e, t) {
	let n = new Di([
		new I(.001, -t * .4),
		new I(e * .25, -t * .4),
		new I(e * .3, -t * .3),
		new I(e * .55, -t * .32),
		new I(e * .62, -t * .44),
		new I(e * .62, t * .44),
		new I(e * .55, t * .32),
		new I(e * .3, t * .3),
		new I(e * .25, t * .4),
		new I(.001, t * .4)
	], 32);
	return n.rotateX(Math.PI / 2), n;
}
function mc(e, t, n) {
	let r = new R(), i = new B(fc(e, t), n.rubber), a = new B(pc(e, t), n.hub);
	i.castShadow = a.castShadow = !0, i.receiveShadow = !0, r.add(i, a);
	let o = new $n(new lr(.012, .012, t * .86, 6), n.metal, 8), s = new We();
	for (let t = 0; t < 8; t++) {
		let n = t / 8 * Math.PI * 2;
		s.makeRotationX(Math.PI / 2).setPosition(Math.cos(n) * e * .2, Math.sin(n) * e * .2, 0), o.setMatrixAt(t, s);
	}
	return r.add(o), r;
}
function hc(e, t, n, r, i = n, a = 16) {
	let o = new L().subVectors(t, e), s = new B(new lr(i, n, o.length(), a), r);
	return s.position.copy(e).addScaledVector(o, .5), s.quaternion.setFromUnitVectors(new L(0, 1, 0), o.normalize()), s.castShadow = !0, s.receiveShadow = !0, s;
}
function gc(e, t, n, r) {
	let i = new B(new or(e, t, n), r);
	return i.castShadow = !0, i.receiveShadow = !0, i;
}
function _c(e, t) {
	let n = Ko.nose, r = new R(), i = q(...n.trunnion);
	r.position.copy(i), e.add(r);
	let a = (e, t, n) => q(e, t, n).sub(i), o = a(...n.axle), s = new L(0, 0, 0), c = a(4.21, 0, -1.55);
	r.add(hc(s, c, .075, t.gear)), r.add(hc(c.clone().add(new L(0, .1, 0)), o.clone().add(new L(0, .05, 0)), .05, t.chrome));
	let l = gc(.12, .16, .24, t.gear);
	l.position.copy(o).add(new L(0, .07, 0)), r.add(l), r.add(hc(o.clone().add(new L(0, 0, -.24)), o.clone().add(new L(0, 0, .24)), .03, t.metal));
	for (let e of [-1, 1]) {
		let i = mc(n.wheelR, n.wheelW, t);
		i.position.copy(o).add(new L(0, 0, e * .155)), r.add(i);
	}
	r.add(hc(c.clone().add(new L(-.09, 0, 0)), o.clone().add(new L(-.1, .18, 0)), .02, t.gear));
	let u = a(4.3, 0, -1.72), d = a(3.55, 0, -1.48);
	r.add(hc(u, d, .035, t.gear)), r.add(hc(a(4.25, 0, -1.15), a(3.55, 0, -.78), .035, t.gear));
	let f = new B(new lr(.05, .05, .05, 16), t.lamp);
	f.rotation.z = Math.PI / 2, f.position.copy(a(4.12, 0, -1.25)), r.add(f);
	let p = [];
	for (let n of [-1, 1]) {
		let r = new R();
		r.position.copy(q(4, n * .19, -.93));
		let i = gc(1.05, .012, .3, t.paintLower);
		i.position.set(0, 0, -n * .15), r.add(i), r.userData.sgn = n, e.add(r), p.push(r);
	}
	let m = gc(1, .02, .36, t.well);
	return m.position.copy(q(4, 0, -.925)), m.castShadow = !1, e.add(m), { set(e) {
		let t = (1 - e) * 100 * (Math.PI / 180);
		r.rotation.z = t, r.visible = e > .02;
		let n = _o(0, .35, e) * 85 * (Math.PI / 180);
		for (let t of p) t.rotation.x = -t.userData.sgn * n, t.visible = e > .01;
		m.visible = e > .01;
	} };
}
function vc(e, t, n) {
	let r = Ko.main, i = q(r.trunnion[0], t * r.trunnion[1], -.12), a = new R();
	a.position.copy(i), e.add(a);
	let o = (e, n, r) => q(e, t * n, r).sub(i), s = o(...r.axle), c = o(r.axle[0], r.axle[1] - .22, r.axle[2] + .05), l = o(11.13, 2.24, -1.15);
	a.add(hc(new L(), l, .1, n.gear, .11)), a.add(hc(l, c, .07, n.chrome));
	let u = new R();
	u.position.copy(c), a.add(u);
	let d = mc(r.wheelR, r.wheelW, n);
	d.position.copy(s).sub(c), u.add(d), u.add(hc(new L(), d.position.clone().setY(0), .045, n.metal));
	let f = gc(.2, .22, .14, n.gear);
	f.position.set(0, .04, 0), u.add(f), a.add(hc(l.clone().add(new L(.12, -.05, 0)), c.clone().add(new L(.12, .12, 0)), .025, n.gear)), a.add(hc(l.clone().add(new L(0, .05, 0)), o(10.15, 2.15, -.2), .045, n.gear)), a.add(hc(o(11.12, 2.25, -.95), o(11.05, 1.75, -.35), .035, n.gear));
	let p = gc(.75, 1, .012, n.paintLower), m = o(11, 2.4, -.75);
	p.position.copy(m), p.rotation.x = t * .12, a.add(p);
	let h = new R();
	h.position.copy(q(10.75, t * 2.15, -.23));
	let g = gc(1.25, .012, .5, n.paintLower);
	g.position.set(0, 0, t * .25), h.add(g), e.add(h);
	let _ = gc(1.2, .02, .55, n.well);
	return _.position.copy(q(10.75, t * 2.42, -.225)), _.castShadow = !1, e.add(_), { set(e) {
		let n = (1 - e) * 90 * (Math.PI / 180);
		a.rotation.z = n, u.rotation.y = t * (1 - _o(.15, .85, e)) * (Math.PI / 2), a.visible = e > .02, h.rotation.x = t * _o(0, .4, e) * 1.45, h.visible = e > .01, _.visible = e > .01;
	} };
}
// node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js
var yc = new L();
function bc(e, t, n, r, i, a) {
	let o = 2 * Math.PI * i / 4, s = Math.max(a - 2 * i, 0), c = Math.PI / 4;
	yc.copy(t), yc[r] = 0, yc.normalize();
	let l = .5 * o / (o + s), u = 1 - yc.angleTo(e) / c;
	return Math.sign(yc[n]) === 1 ? u * l : s / (o + s) + l + l * (1 - u);
}
var xc = class e extends or {
	constructor(e = 1, t = 1, n = 1, r = 2, i = .1) {
		let a = r * 2 + 1;
		if (i = Math.min(e / 2, t / 2, n / 2, i), super(1, 1, 1, a, a, a), this.type = "RoundedBoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			segments: r,
			radius: i
		}, a === 1) return;
		let o = this.toNonIndexed();
		this.index = null, this.attributes.position = o.attributes.position, this.attributes.normal = o.attributes.normal, this.attributes.uv = o.attributes.uv;
		let s = new L(), c = new L(), l = new L(e, t, n).divideScalar(2).subScalar(i), u = this.attributes.position.array, d = this.attributes.normal.array, f = this.attributes.uv.array, p = u.length / 6, m = new L(), h = .5 / a;
		for (let r = 0, a = 0; r < u.length; r += 3, a += 2) switch (s.fromArray(u, r), c.copy(s), c.x -= Math.sign(c.x) * h, c.y -= Math.sign(c.y) * h, c.z -= Math.sign(c.z) * h, c.normalize(), u[r + 0] = l.x * Math.sign(s.x) + c.x * i, u[r + 1] = l.y * Math.sign(s.y) + c.y * i, u[r + 2] = l.z * Math.sign(s.z) + c.z * i, d[r + 0] = c.x, d[r + 1] = c.y, d[r + 2] = c.z, Math.floor(r / p)) {
			case 0:
				m.set(1, 0, 0), f[a + 0] = bc(m, c, "z", "y", i, n), f[a + 1] = 1 - bc(m, c, "y", "z", i, t);
				break;
			case 1:
				m.set(-1, 0, 0), f[a + 0] = 1 - bc(m, c, "z", "y", i, n), f[a + 1] = 1 - bc(m, c, "y", "z", i, t);
				break;
			case 2:
				m.set(0, 1, 0), f[a + 0] = 1 - bc(m, c, "x", "z", i, e), f[a + 1] = bc(m, c, "z", "x", i, n);
				break;
			case 3:
				m.set(0, -1, 0), f[a + 0] = 1 - bc(m, c, "x", "z", i, e), f[a + 1] = 1 - bc(m, c, "z", "x", i, n);
				break;
			case 4:
				m.set(0, 0, 1), f[a + 0] = 1 - bc(m, c, "x", "y", i, e), f[a + 1] = 1 - bc(m, c, "y", "x", i, t);
				break;
			case 5: m.set(0, 0, -1), f[a + 0] = bc(m, c, "x", "y", i, e), f[a + 1] = 1 - bc(m, c, "y", "x", i, t);
		}
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.segments, t.radius);
	}
}, Sc = {
	top: G([
		[3.35, .5],
		[3.6, .72],
		[3.9, .93],
		[4.2, 1.08],
		[4.45, 1.17],
		[5, 1.26],
		[5.6, 1.29],
		[6.5, 1.29],
		[7.2, 1.24],
		[7.8, 1.12],
		[8.3, .98],
		[8.6, .93]
	]),
	hw: G([
		[3.35, .42],
		[4, .5],
		[4.45, .53],
		[5.5, .55],
		[6.5, .55],
		[7.5, .53],
		[8.3, .47],
		[8.6, .42]
	]),
	n: G([
		[3.35, 2.2],
		[4.45, 2.5],
		[6, 2.6],
		[8.6, 2.4]
	]),
	hinge: [
		8.6,
		0,
		.85
	],
	sWind: 4.45,
	sGlass: 8.3,
	sEnd: 8.65
}, Cc = (e) => rs(e, Sc.hw(e)) - .012;
function wc(e, t, n = 0) {
	let r = Sc.hw(e) + n, i = Cc(e), a = Sc.top(e) + n, o = 2 / Sc.n(e);
	return [
		e,
		r * go(Math.cos(t), o),
		i + (a - i) * go(Math.sin(t), o)
	];
}
function Tc(e, t, n = 0) {
	return K(0, Math.PI, t).map((t) => wc(e, t, n));
}
function Ec(e, t) {
	let n = 0, r = Math.PI / 2;
	for (let i = 0; i < 40; i++) {
		let i = (n + r) / 2;
		wc(e, i)[1] > t ? n = i : r = i;
	}
	return (n + r) / 2;
}
function Dc(e, t, n, r = !1) {
	let i = new B(new Mi(new br(e.map((e) => J(e)), r, "centripetal"), Math.max(8, e.length * 3), t, 8, r), n);
	return i.castShadow = !0, i;
}
function Oc(e, t, n, r = null) {
	let i = new B(new or(e[0], e[1], e[2]), n);
	return i.position.copy(t), r && i.rotation.set(r[0], r[1], r[2]), i.castShadow = !0, i.receiveShadow = !0, i;
}
function kc(e, t, n, r = .02) {
	let i = Math.min(r, ...e.map((e) => e / 2 - .001)), a = new B(new xc(e[0], e[1], e[2], 2, i), n);
	return a.position.copy(t), a.castShadow = !0, a.receiveShadow = !0, a;
}
function Ac(e, t, n) {
	let r = new B(new ji(e, .011, 6, 18, Math.PI), n.yellowBlack);
	return r.position.copy(t), r.rotation.y = Math.PI / 2, r;
}
var jc = (e, t, n = 0) => new L(e, t, n);
function Mc(e, t) {
	let n = new R();
	n.position.copy(q(e, 0, .42)), n.rotation.z = .22;
	let r = t.seat;
	n.add(kc([
		.12,
		.7,
		.46
	], jc(-.14, .25), r, .025)), n.add(kc([
		.11,
		.5,
		.38
	], jc(-.025, .25), t.seatPad, .035)), n.add(kc([
		.22,
		.22,
		.4
	], jc(-.11, .61), r, .05)), n.add(kc([
		.035,
		.15,
		.24
	], jc(-.0025, .58), t.seatPad, .015)), n.add(Ac(.05, jc(-.04, .72), t)), n.add(kc([
		.46,
		.1,
		.44
	], jc(.15, -.07), r, .025)), n.add(kc([
		.42,
		.045,
		.38
	], jc(.15, 0), t.seatPad, .02)), n.add(Ac(.04, jc(.36, 0), t));
	for (let e of [-.235, .235]) n.add(kc([
		.38,
		.3,
		.03
	], jc(.11, .03, e), r, .012)), n.add(kc([
		.05,
		.05,
		.03
	], jc(.24, .2, e), t.metalDark, .01));
	for (let e of [-.15, .15]) n.add(kc([
		.035,
		.8,
		.035
	], jc(-.23, .3, e), t.metalDark, .008));
	return n;
}
function Nc(e, t, n, r, i, a) {
	let o = new R();
	o.position.copy(q(e, 0, t)), o.rotation.y = -Math.PI / 2;
	let s = new B(new Oi(n, r), a.cockpit);
	o.add(s);
	for (let e of i) {
		let t;
		if (t = e.round ? new B(new cr(e.r, 32), e.mat || a.display) : new B(new Oi(e.w, e.h), e.mat || a.display), t.position.set(e.y, e.z, .002), o.add(t), e.bezel) {
			let t = e.round ? new B(new ki(e.r, e.r + .018, 32), a.coaming) : new B(new Oi(e.w + .03, e.h + .03), a.coaming);
			t.position.set(e.y, e.z, e.round ? .002 : .001), o.add(t);
		}
	}
	return o;
}
function Pc(e, t, n, r, i, a, o) {
	let s = [], c = a, l = () => (c = c * 16807 % 2147483647) / 2147483647;
	for (let a = 0; a < i; a++) s.push({
		round: !0,
		r: .018 + l() * .012,
		y: W(e, t, l()),
		z: W(n, r, l()),
		mat: o.gauge
	});
	return s;
}
function Fc(e, t, n) {
	let r = new R();
	r.position.copy(q(e - .15, 0, .42)), r.rotation.z = .22;
	let i = new B(new sr(.17, .25, 4, 12), t.suit);
	i.scale.set(.75, 1, 1.25), i.position.set(.02, .18, 0);
	let a = new B(new sr(.175, .18, 4, 12), t.harness);
	a.scale.set(.78, 1, 1.27), a.position.set(.02, .24, 0);
	let o = new B(new Ai(.135, 20, 16), t.helmet);
	o.scale.set(1.08, 1, .95), o.position.set(.03, .56, 0);
	let s = new B(new Ai(.138, 20, 10, -Math.PI * .42, Math.PI * .84, Math.PI * .3, Math.PI * .25), n);
	s.scale.set(1.08, 1, .96), s.position.copy(o.position), s.rotation.y = Math.PI;
	let c = new B(new Ai(.06, 12, 8), t.mask);
	c.scale.set(1, .9, .8), c.position.set(.13, .49, 0);
	for (let e of [
		i,
		a,
		o,
		s,
		c
	]) e.castShadow = !0, r.add(e);
	return r;
}
function Ic(e, t) {
	let n = Sc, r = So(K(3.3, n.sWind, 14).map((e) => Tc(e, 34)), { closed: !1 });
	e.add(Lc(r, null, t));
	let i = Dc(Tc(n.sWind, 24, .012), .03, t.frame);
	e.add(i);
	for (let r of [-1, 1]) {
		let i = K(3.42, n.sWind, 10).map((e) => {
			let t = Ec(e, .27 * (n.hw(e) / .53));
			return wc(e, r > 0 ? t : Math.PI - t, .008);
		});
		e.add(Dc(i, .016, t.frame));
		let a = K(3.4, n.sWind, 8).map((e) => [
			e,
			r * (n.hw(e) + .005),
			Cc(e) + .01
		]);
		e.add(Dc(a, .018, t.frame));
	}
	for (let r of [-1, 1]) {
		let i = wc(n.sWind - .02, r > 0 ? .95 : Math.PI - .95, -.02);
		e.add(Oc([
			.03,
			.05,
			.12
		], J(i), t.frame));
	}
	let a = Ao(e, n.hinge, [
		0,
		1,
		0
	]), o = So(K(n.sWind, n.sGlass, 30).map((e) => Tc(e, 34)), { closed: !1 });
	a.add(Lc(o, n.hinge, t));
	let s = jo(So(K(n.sGlass, n.sEnd, 6).map((e) => Tc(e, 34, .002)), {
		closed: !1,
		capEnd: !1
	}), t.body, n.hinge, "canopyAft");
	s.material = t.bodyDouble, a.add(s);
	let c = (e, r) => {
		let i = Dc(e, r, t.frame);
		return i.position.sub(J(n.hinge)), i;
	};
	a.add(c(Tc(n.sWind + .02, 24, .008), .022)), a.add(c(Tc(n.sGlass, 24, .008), .026));
	for (let e of [-1, 1]) {
		let t = K(n.sWind, n.sEnd, 12).map((t) => [
			t,
			e * (n.hw(t) + .008),
			Cc(t) + .015
		]);
		a.add(c(t, .022));
	}
	let l = new R();
	e.add(l), l.add(kc([
		.38,
		.22,
		.8
	], q(4.93, 0, .7), t.cockpit, .03)), l.add(kc([
		.4,
		.035,
		.84
	], q(4.92, 0, .82), t.coaming, .015));
	let u = new B(new Oi(.16, .14), t.hud);
	u.position.copy(q(4.88, 0, .92)), u.rotation.set(0, Math.PI / 2, 0), u.rotateX(-.45), l.add(u), l.add(Oc([
		.12,
		.06,
		.18
	], q(4.92, 0, .84), t.cockpit)), l.add(Nc(5.122, .68, .76, .2, [
		{
			w: .13,
			h: .12,
			y: 0,
			z: .03,
			bezel: !0
		},
		{
			w: .11,
			h: .07,
			y: 0,
			z: -.068,
			bezel: !0
		},
		...Pc(-.34, -.12, -.08, .08, 7, 11, t),
		...Pc(.12, .34, -.08, .08, 7, 29, t)
	], t)), l.add(kc([
		.3,
		.2,
		.76
	], q(6.62, 0, .66), t.cockpit, .03)), l.add(kc([
		.32,
		.035,
		.8
	], q(6.61, 0, .765), t.coaming, .015)), l.add(Nc(6.772, .655, .72, .18, [
		{
			round: !0,
			r: .075,
			y: 0,
			z: -.005,
			bezel: !0
		},
		{
			w: .12,
			h: .08,
			y: -.22,
			z: 0,
			bezel: !0
		},
		...Pc(.13, .33, -.07, .07, 6, 47, t)
	], t));
	for (let e of [-1, 1]) for (let [n, r] of [[5.85, 1.1], [7.45, 1]]) {
		l.add(kc([
			r,
			.08,
			.16
		], q(n, e * .42, .56), t.cockpit, .015));
		let i = new B(new Oi(r - .06, .12), t.consoleTop);
		i.position.copy(q(n, e * .42, .601)), i.rotation.x = -Math.PI / 2, l.add(i);
	}
	l.add(Mc(5.75, t)), l.add(Mc(7.25, t));
	let d = new R();
	d.add(Fc(5.75, t, t.visorGold)), d.add(Fc(7.25, t, t.visorDark)), l.add(d);
	let f = new Vr();
	for (let e = 0; e <= 24; e++) {
		let t = wc(8, e / 24 * Math.PI, -.035);
		e === 0 ? f.moveTo(t[1], t[2]) : f.lineTo(t[1], t[2]);
	}
	f.lineTo(-.4, .45), f.lineTo(.4, .45);
	let p = new B(new wi(f, {
		depth: .05,
		bevelEnabled: !1,
		curveSegments: 1
	}), t.cockpit);
	return p.rotation.y = Math.PI / 2, p.position.copy(q(8.05, 0, 0)), p.castShadow = p.receiveShadow = !0, l.add(p), {
		canopyHinge: a,
		crew: d,
		interior: l
	};
}
function Lc(e, t, n) {
	let r = new R(), i = jo(e, n.glassTint, t, "glass");
	i.castShadow = !1, i.receiveShadow = !1, i.renderOrder = 2;
	let a = new B(i.geometry, n.glassReflect);
	return a.renderOrder = 3, r.add(i, a), r;
}
// src/f14/engine.js
var Rc = 72;
function zc(e) {
	let t = qo, n = [], r = G([
		[t.s0, t.r + .005],
		[t.s0 + .3, t.r - .002],
		[t.s1, t.r - .015]
	]);
	for (let e = 0; e <= 6; e++) {
		let i = W(t.s0, t.s1, e / 6);
		n.push({
			s: i,
			r: r(i),
			petal: 0
		});
	}
	n.push({
		s: t.s1 + .002,
		r: t.r - .04,
		petal: 0
	});
	let i = t.r - .04;
	for (let r = 1; r <= 10; r++) {
		let a = r / 10, o = W(t.s1, t.s2, a), s = W(i, e, _o(0, 1, a)) + .012 * Math.sin(Math.PI * a);
		n.push({
			s: o,
			r: s,
			petal: a
		});
	}
	n.push({
		s: t.s2 + .004,
		r: e - .012,
		petal: 1,
		lip: !0
	}), n.push({
		s: t.s2,
		r: e - .024,
		petal: 1,
		lip: !0
	});
	for (let r = 1; r <= 8; r++) {
		let i = r / 8;
		n.push({
			s: W(t.s2, 17.25, i),
			r: W(e - .024, t.r - .08, _o(0, .6, i)),
			petal: 1 - i,
			inner: !0
		});
	}
	return n;
}
function Bc(e) {
	let t = qo;
	return zc(e).map((e) => {
		let n = [];
		for (let r = 0; r < Rc; r++) {
			let i = r / Rc * Math.PI * 2, a = Math.abs(Math.cos(9 * i)) ** 6, o = e.petal > 0 ? .08 * a * _o(.6, 1, e.petal) : 0, s = e.petal > 0 && !e.inner ? .006 * Math.cos(18 * i) * Math.sin(Math.PI * e.petal) : 0, c = e.r + s;
			n.push([
				e.s - o,
				t.y + c * Math.cos(i),
				t.w + c * Math.sin(i)
			]);
		}
		return n;
	});
}
function Vc(e) {
	let t = [];
	return e.forEach((e) => {
		let n;
		if (e.inner) n = [
			.035,
			.03,
			.026
		];
		else if (e.petal > 0) {
			let t = Math.sin(Math.PI * Math.min(e.petal * 1.4, 1));
			n = [
				W(.075, .04, e.petal) + .016 * t,
				W(.072, .037, e.petal) + .007 * t,
				W(.074, .036, e.petal) - .005 * t
			];
		} else n = [
			.085,
			.082,
			.078
		];
		for (let e = 0; e < Rc; e++) t.push(n[0], n[1], n[2]);
	}), t;
}
function Hc(e) {
	let t = e.attributes.position;
	for (let e = 0; e < t.count; e++) t.setXYZ(e, -t.getX(e), t.getZ(e), t.getY(e));
	return e.computeVertexNormals(), e;
}
function Uc(e, t) {
	let n = qo, r = zc(n.exitDry), i = So(Bc(n.exitDry), { closed: !0 });
	i.setAttribute("color", new z(Vc(r), 3));
	let a = Hc(i.clone()), o = Hc(Co(i)), s = (r.findIndex((e) => e.inner) - 1) * Rc * 6;
	for (let e of [a, o]) e.clearGroups(), e.addGroup(0, s, 0), e.addGroup(s, e.index.count - s, 1);
	let c = new B(a, [t.nozzle, t.nozzleInner]), l = new B(o, [t.nozzle, t.nozzleInner]);
	for (let t of [c, l]) t.castShadow = !0, t.receiveShadow = !0, e.add(t);
	let u = new cr(n.r - .075, 48), d = [.2, .36].map((e) => new ji(e, .018, 6, 48)), f = new or(.02, n.r - .12, .03);
	f.translate(0, (n.r - .12) / 2 + .05, 0);
	let p = [], m = [];
	for (let r of [1, -1]) {
		let i = new B(u, t.flameHolder);
		i.position.copy(q(17.25, r * n.y, n.w)), i.rotation.y = -Math.PI / 2, e.add(i), p.push(i);
		let a = new R();
		a.position.copy(q(17.33, r * n.y, n.w)), a.rotation.y = -Math.PI / 2;
		for (let e of d) a.add(new B(e, t.metalDark));
		for (let e = 0; e < 10; e++) {
			let n = new B(f, t.metalDark);
			n.rotation.z = e / 10 * Math.PI * 2, a.add(n);
		}
		e.add(a);
		let o = new B(new ur(.16, .35, 24), t.metalDark);
		o.rotation.z = Math.PI / 2, o.position.copy(q(17.4, r * n.y, n.w)), e.add(o);
		let s = new ba(16747066, 0, 9, 1.6);
		s.position.copy(q(19.6, r * n.y, n.w)), e.add(s), m.push(s);
	}
	let h = [];
	for (let r of [1, -1]) {
		let i = new R();
		i.position.copy(q(n.s2 - .05, r * n.y, n.w)), i.rotation.z = Math.PI / 2;
		let a = [
			{
				len: 4.2,
				r0: .5,
				r1: .12,
				mat: t.flameOuter
			},
			{
				len: 3,
				r0: .4,
				r1: .08,
				mat: t.flameMid
			},
			{
				len: 1.7,
				r0: .3,
				r1: .04,
				mat: t.flameCore
			}
		];
		for (let e of a) {
			let t = new lr(e.r1, e.r0, e.len, 40, 24, !0);
			t.translate(0, e.len / 2, 0);
			let n = new B(t, e.mat);
			n.userData.len = e.len, n.renderOrder = 5, n.frustumCulled = !1, i.add(n);
		}
		i.visible = !1, e.add(i), h.push(i);
	}
	for (let n of [1, -1]) {
		let r = 10.15, i = new B(new ur(.17, .32, 24), t.metalDark);
		i.rotation.z = -Math.PI / 2, i.position.copy(q(10.030000000000001, n * Y.yc(r), Y.wc(r))), e.add(i);
	}
	let g = n.exitDry, _ = (e) => {
		if (Math.abs(e - g) < 1e-4) return;
		g = e;
		let t = Bc(e), n = a.attributes.position, r = o.attributes.position, i = 0;
		for (let e of t) for (let t of e) n.setXYZ(i, -t[0], t[2], t[1]), r.setXYZ(i, -t[0], t[2], -t[1]), i++;
		n.needsUpdate = r.needsUpdate = !0, a.computeVertexNormals(), o.computeVertexNormals();
	};
	return {
		flames: h,
		update(e, r, i) {
			_(W(n.exitDry, n.exitAB, _o(0, .3, r)) - .04 * ho(e, 0, 1) * (1 - r));
			let a = ho(.3 * e * e + 1.8 * r, 0, 2.5);
			t.flameHolder.emissiveIntensity = a;
			for (let e of h) {
				e.visible = r > .01;
				let t = 1 + .05 * Math.sin(i * 37) + .04 * Math.sin(i * 23.7);
				e.scale.set(1, W(.5, 1, r) * t, 1);
			}
			t.setFlame(r, i);
			for (let e of m) e.intensity = r * 40 * (1 + .1 * Math.sin(i * 30));
		}
	};
}
// src/f14/livery.js
var Wc = {
	body: {
		s0: -.2,
		S: 19.6,
		y0: -5.1,
		Y: 10.2,
		w0: -2.4,
		Wr: 5.2
	},
	wing: {
		s0: 9.8,
		S: 4.8,
		y0: -9.9,
		Y: 19.8
	}
}, Gc = {
	top: [2048, 4096],
	side: [4096, 2048],
	wing: [4096, 1024]
}, Kc = {
	lowvis: {
		name: "Low-vis TPS (1980s-2000s)",
		upper: "#737b84",
		lower: "#9ca3a9",
		side: "#7c838b",
		radome: "#6a7076",
		antiglare: "#4d5258",
		mark: "#565c63",
		markLight: "#a9afb4",
		interior: "#33383d",
		walkway: "#626970",
		control: null,
		weather: 1,
		lowvis: !0
	},
	highvis: {
		name: "Gull gray / white (1970s)",
		upper: "#a8a9a3",
		lower: "#eeeeea",
		side: "#a8a9a3",
		radome: "#a5a69f",
		antiglare: "#2a2c2e",
		mark: "#1d1d1d",
		markLight: "#ffffff",
		interior: "#33383d",
		walkway: "#5c5e5c",
		control: "#efefeb",
		weather: .45,
		lowvis: !1
	}
};
function qc(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Jc(e, t) {
	let n = document.createElement("canvas");
	return n.width = e, n.height = t, n;
}
function Yc(e, t, n, r = 1) {
	let i = e.canvas.width, a = e.canvas.height;
	if (t === "top" || t === "bottom") {
		let r = i / n.Y, o = a / n.S, s = t === "bottom";
		return {
			ctx: e,
			kx: r,
			ky: o,
			kind: t,
			P: (e, t) => [(s ? 1 - (t - n.y0) / n.Y : (t - n.y0) / n.Y) * i, (e - n.s0) / n.S * a]
		};
	}
	return {
		ctx: e,
		kx: i / n.S,
		ky: a / 2 / n.Wr,
		kind: t,
		side: r,
		P: (e, t) => [(r === 1 ? 1 - (e - n.s0) / n.S : (e - n.s0) / n.S) * i, (r === 1 ? 0 : a / 2) + (1 - (t - n.w0) / n.Wr) * (a / 2)]
	};
}
function Xc(e, t, n, r = null, i = 2) {
	let { ctx: a } = e;
	a.beginPath(), t.forEach((t, n) => {
		let [r, i] = e.P(t[0], t[1]);
		n === 0 ? a.moveTo(r, i) : a.lineTo(r, i);
	}), a.closePath(), n && (a.fillStyle = n, a.fill()), r && (a.strokeStyle = r, a.lineWidth = i, a.stroke());
}
function X(e, t, n, r = 2, i = null) {
	let { ctx: a } = e;
	a.beginPath(), t.forEach((t, n) => {
		let [r, i] = e.P(t[0], t[1]);
		n === 0 ? a.moveTo(r, i) : a.lineTo(r, i);
	}), a.strokeStyle = n, a.lineWidth = r, a.setLineDash(i || []), a.stroke(), a.setLineDash([]);
}
function Zc(e, t, n, r, i, a, o = null, s = 2) {
	Xc(e, [
		[t, n],
		[r, n],
		[r, i],
		[t, i]
	], a, o, s);
}
function Qc(e, t, n, r) {
	let { ctx: i } = e, [a, o] = e.P(t, n);
	i.save(), i.setTransform(e.kx, 0, 0, e.ky, a, o), r(i), i.restore();
}
function $c(e, t, n, r, i, a, o = {}) {
	let { ctx: s } = e, [c, l] = e.P(t, n);
	s.save(), s.setTransform(e.kx / e.ky, 0, 0, 1, c, l), o.rot && s.rotate(o.rot);
	let u = i * e.ky;
	s.font = `${o.weight || 700} ${u}px ${o.font || "'DIN Condensed','Arial Narrow','Roboto Condensed','Helvetica Neue',Arial,sans-serif"}`, s.textAlign = o.align || "center", s.textBaseline = "middle", o.stretch && s.scale(o.stretch, 1), o.outline && (s.lineWidth = u * .08, s.strokeStyle = o.outline, s.strokeText(r, 0, 0)), o.strokeOnly ? (s.lineWidth = u * .05, s.strokeStyle = a, s.strokeText(r, 0, 0)) : (s.fillStyle = a, s.fillText(r, 0, 0)), s.restore();
}
function el(e, t, n = 0, r = 0) {
	e.beginPath();
	for (let i = 0; i < 10; i++) {
		let a = i % 2 == 0 ? t : t * .382, o = -Math.PI / 2 + i * Math.PI / 5, s = n + a * Math.cos(o), c = r + a * Math.sin(o);
		i === 0 ? e.moveTo(s, c) : e.lineTo(s, c);
	}
	e.closePath();
}
function tl(e, t, n, r, i) {
	Qc(e, t, n, (e) => {
		let t = -.309 * r, n = .5 * r, a = 2 * r, o = () => {
			e.beginPath(), e.moveTo(-a, t), e.lineTo(-r * .95, t), e.arc(0, 0, r, Math.PI + .31, -.31 + Math.PI * 2, !1), e.lineTo(a, t), e.lineTo(a, t + n), e.lineTo(r * .95, t + n), e.arc(0, 0, r, .2, Math.PI - .2, !1), e.lineTo(-a, t + n), e.closePath();
		};
		if (i.lowvis) {
			e.lineWidth = r * .05, e.strokeStyle = i.mark, o(), e.stroke(), e.beginPath(), e.rect(-a + r * .12, t + n * .38, a * 2 - r * .24, n * .24), e.stroke(), el(e, r * .97), e.fillStyle = i.mark, e.globalAlpha = .25, e.fill(), e.globalAlpha = 1, e.stroke();
			return;
		}
		let s = r * .12;
		e.fillStyle = "#1f2f5f", e.beginPath(), e.arc(0, 0, r + s, 0, Math.PI * 2), e.fill(), e.fillRect(-a - s, t - s, a * 2 + s * 2, n + s * 2), e.fillStyle = "#ffffff", e.fillRect(-a, t, a * 2, n), e.fillStyle = "#1f2f5f", e.beginPath(), e.arc(0, 0, r, 0, Math.PI * 2), e.fill(), e.fillStyle = "#b3242c", e.fillRect(-a + r * .1, t + n * .36, a * 2 - r * .2, n * .28), e.fillStyle = "#ffffff", el(e, r), e.fill();
	});
}
function nl(e, t, n, r, i, a, o, s, c = [.15, .9], l = [.1, .5]) {
	let { ctx: u } = e, d = s.weather;
	if (d <= 0) return;
	let f = u.canvas.width, p = u.canvas.height, m = Math.ceil(f / 4), h = Math.ceil(p / 4), g = Jc(m, h), _ = g.getContext("2d");
	_.fillStyle = "rgb(128,128,128)", _.fillRect(0, 0, m, h);
	for (let s = 0; s < n; s++) {
		let [n, s] = e.P(W(r, i, t()), W(a, o, t())), l = Math.max(3, W(c[0], c[1], t()) * Math.abs(e.kx) / 4), u = t() < .5 ? 255 : 0, f = _.createRadialGradient(n / 4, s / 4, 0, n / 4, s / 4, l);
		f.addColorStop(0, `rgba(${u},${u},${u},${.09 * d})`), f.addColorStop(1, `rgba(${u},${u},${u},0)`), _.fillStyle = f, _.fillRect(n / 4 - l, s / 4 - l, l * 2, l * 2);
	}
	let v = Jc(m, h), y = v.getContext("2d");
	y.filter = "blur(1.5px)", y.drawImage(g, 0, 0), u.save(), u.globalCompositeOperation = "soft-light", u.imageSmoothingEnabled = !0, u.imageSmoothingQuality = "high", u.drawImage(y.filter === "none" ? g : v, 0, 0, f, p), u.restore();
	for (let s = 0; s < n / 10; s++) {
		let n = W(r, i, t()), s = W(a, o, t()), f = W(c[0], c[1], t()) * .7, p = W(l[0], l[1], t()) * .7, m = t() < .4, h = m ? 235 : 40;
		u.fillStyle = `rgba(${h},${h + (m ? 0 : 3)},${h + (m ? 0 : 6)},${(.02 + t() * .03) * d})`;
		let [g, _] = e.P(n, s), [v, y] = e.P(n + f, s + p);
		u.fillRect(Math.min(g, v), Math.min(_, y), Math.abs(v - g), Math.abs(y - _));
	}
}
function rl(e, t, n, r, i, a, o, s, c = 0) {
	let { ctx: l } = e;
	for (let u = 0; u < n; u++) {
		let [n, u] = e.P(W(i, a, t()), W(o, s, t())), d = (6 + t() * 30) * (e.kx / 200), f = l.createRadialGradient(n, u, 0, n, u, d);
		f.addColorStop(0, `rgba(25,25,22,${.06 * r})`), f.addColorStop(1, "rgba(25,25,22,0)"), l.fillStyle = f, c ? l.fillRect(n - d, u - d, d * 2 + c * e.kx * t(), d * 2) : l.fillRect(n - d, u - d, d * 2, d * 2);
	}
}
function il(e, t, n, r, i, a) {
	let { ctx: o } = e, [s, c] = e.P(t, n), l = r * e.kx, u = i * e.ky;
	o.save(), o.translate(s, c), o.scale(1, u / l);
	let d = o.createRadialGradient(0, 0, 0, 0, 0, l);
	d.addColorStop(0, `rgba(28,24,20,${a})`), d.addColorStop(.6, `rgba(28,24,20,${a * .45})`), d.addColorStop(1, "rgba(28,24,20,0)"), o.fillStyle = d, o.fillRect(-l, -l, l * 2, l * 2), o.restore();
}
function al(e, t, n, r) {
	let { ctx: i } = e;
	i.fillStyle = r;
	for (let r = 0; r < t.length - 1; r++) {
		let [a, o] = e.P(t[r][0], t[r][1]), [s, c] = e.P(t[r + 1][0], t[r + 1][1]), l = Math.hypot(s - a, c - o), u = Math.floor(l / n);
		for (let e = 0; e <= u; e++) {
			let t = u ? e / u : 0;
			i.fillRect(a + (s - a) * t - .6, o + (c - o) * t - .6, 1.3, 1.3);
		}
	}
}
var Z = "rgba(20,22,26,0.42)", ol = "rgba(20,22,26,0.25)", sl = "rgba(25,28,32,0.22)";
function cl(e) {
	let [t, n] = Gc.top, r = Jc(t, n), i = r.getContext("2d"), a = Wc.body, o = Yc(i, "top", a), s = qc(11);
	i.fillStyle = e.upper, i.fillRect(0, 0, t, n), Zc(o, -.3, -1, 2.45, 1, e.radome), Xc(o, [
		[2.45, -.46],
		[3.42, -.42],
		[3.42, .42],
		[2.45, .46]
	], e.antiglare), Xc(o, [
		[1.2, -.12],
		[2.45, -.46],
		[2.45, .46],
		[1.2, .12]
	], e.lowvis ? null : e.antiglare), X(o, [[2.45, -.62], [2.45, .62]], Z, 3);
	let c = [];
	for (let e = 3.3; e <= Sc.sGlass + .02; e += .05) c.push([e, Sc.hw(e) - .01]);
	Xc(o, c.concat(c.slice().reverse().map(([e, t]) => [e, -t])), e.interior), Zc(o, 3.3, -.45, 4.6, .45, "#202326"), nl(o, s, 900, 2.4, 19.2, -3.6, 3.6, e);
	for (let e of [
		9.2,
		10,
		10.8,
		11.6,
		12.4,
		13.3,
		14.2,
		15.1,
		15.9,
		16.6
	]) {
		X(o, [[e, -.5], [e, .5]], Z, 2);
		let t = fs(e) - .06;
		X(o, [[e + .05, .55], [e + .05, t]], ol, 2), X(o, [[e + .05, -.55], [e + .05, -t]], ol, 2);
	}
	for (let e of [
		.28,
		.55,
		.95,
		1.35,
		1.85
	]) for (let t of [-1, 1]) X(o, [[8.7, t * e], [16.6, t * e]], e === .28 ? ol : Z, 2), al(o, [[8.7, t * (e + .025)], [16.6, t * (e + .025)]], 9, sl);
	for (let t of [-1, 1]) {
		let n = .28;
		X(o, [[ss[0] + .25, t * (ss[1] - n * .8)], [cs[0] - .05, t * (cs[1] - n)]], Z, 2.5), X(o, [[cs[0] - .05, t * (cs[1] - n)], [ls[0] - .2, t * (ls[1] - .15)]], Z, 2), al(o, [[ss[0] + .3, t * (ss[1] - n * .8 - .03)], [cs[0] - .1, t * (cs[1] - n - .03)]], 8, sl), Xc(o, [
			[8.9, t * .6],
			[10.9, t * .6],
			[10.9, t * 1.3],
			[8.9, t * 1.15]
		], e.walkway, Z, 2);
		for (let e = 0; e < 7; e++) {
			let n = 11.8 + e * .62, r = t * (.65 + e % 3 * .32);
			Zc(o, n, r, n + .36, r + t * .22, null, Z, 2);
		}
		X(o, [[12.4, t * 2.22], [16, t * 2.22]], Z, 2), X(o, [[15.6, t * 2.6], [18.4, t * 4.7]], ol, 2), X(o, [[16.9, t * 2.5], [18.9, t * 4.85]], ol, 2), il(o, 18.6, t * 1.45, 1.4, .75, .28 * e.weather + .08);
	}
	return Zc(o, 16.9, -.42, 18, .42, null, Z, 2.5), X(o, [[16.9, 0], [18, 0]], ol, 1.5), il(o, 18.9, 0, .6, .5, .25), rl(o, s, 380, e.weather, 6, 18, -2.5, 2.5), e.lowvis || $c(o, 13.5, 0, "NO STEP", .08, "#202020"), r;
}
function ll(e) {
	let [t, n] = Gc.top, r = Jc(t, n), i = r.getContext("2d"), a = Wc.body, o = Yc(i, "bottom", a), s = qc(23);
	i.fillStyle = e.lower, i.fillRect(0, 0, t, n), Zc(o, -.3, -1, 2.45, 1, e.lowvis ? e.radome : e.lower), X(o, [[2.45, -.62], [2.45, .62]], Z, 3), nl(o, s, 900, 2.4, 19.2, -3.6, 3.6, e), Zc(o, 3.47, -.19, 4.53, .19, null, Z, 2.5), X(o, [[3.47, 0], [4.53, 0]], Z, 2);
	for (let t of [-1, 1]) {
		Zc(o, 10.13, t * 2.15, 11.38, t * 2.66, null, Z, 2.5);
		for (let e = 0; e < 9; e++) {
			let n = 7.4 + e * 1.05;
			X(o, [[n, t * .95], [n, t * 2]], ol, 2);
		}
		X(o, [[6.8, t * 1.45], [16.8, t * 1.45]], Z, 2), al(o, [[6.8, t * 1.42], [16.8, t * 1.42]], 9, sl), Zc(o, 17, t * .13, 17.95, t * .56, null, Z, 2.5), il(o, 18.7, t * 1.45, 1.5, .8, .3 * e.weather + .08), il(o, 17.6, t * .5, 1.2, .5, .18), X(o, [[ss[0] + .3, t * (ss[1] - .2)], [cs[0] - .1, t * (cs[1] - .25)]], Z, 2);
	}
	for (let e of [9, 12.6]) for (let t of [-1, 1]) Zc(o, e, t * .12, e + 1.2, t * .42, null, Z, 2);
	return il(o, 6, -.75, 1.2, .35, .22), rl(o, s, 420, e.weather, 3, 18, -2.6, 2.6, .3), r;
}
function ul(e, t) {
	let [n, r] = Gc.side, i = Jc(n, r), a = i.getContext("2d"), o = Wc.body;
	for (let r of [1, -1]) {
		let i = Yc(a, "side", o, r), s = qc(r === 1 ? 37 : 41), [, c] = i.P(0, o.w0 + o.Wr), [, l] = i.P(0, o.w0), u = a.createLinearGradient(0, c, 0, l), d = (e) => ho((o.w0 + o.Wr - e) / o.Wr, 0, 1);
		u.addColorStop(0, e.side), u.addColorStop(d(-.05), e.side), u.addColorStop(d(-.75), e.lower), u.addColorStop(1, e.lower), a.fillStyle = u, a.fillRect(0, Math.min(c, l), n, Math.abs(l - c)), Zc(i, -.3, -1.2, 2.45, 1, e.radome), X(i, [[2.45, -1], [2.45, .6]], Z, 3), Xc(i, [
			[2.45, .3],
			[3.42, .48],
			[3.42, .7],
			[2.45, .7]
		], e.antiglare);
		let f = [];
		for (let e = 3.3; e <= 8.62; e += .05) f.push([e, Cc(e) + .005]);
		Xc(i, [
			...f,
			[8.62, 1.6],
			[3.3, 1.6]
		], e.interior), nl(i, s, 1100, 2.4, 19.4, -1.5, 2.6, e, [.15, .9], [.08, .4]);
		for (let e of [
			3.42,
			4.6,
			5.9,
			7.1,
			8.3,
			9.4,
			10.5,
			11.6,
			12.7,
			13.8,
			14.9,
			16
		]) X(i, [[e, -1.1], [e, e < 8.6 ? Cc(e) - .03 : .25]], ol, 2);
		X(i, [[2.45, -.18], [6.1, -.18]], Z, 2), X(i, [[2.45, .22], [8.6, .32]], ol, 2), al(i, [[2.5, -.15], [6, -.15]], 9, sl), X(i, [[6.1, -.1], [6.75, -1.1]], Z, 3), X(i, [[6.6, -.12], [7.25, -1.08]], ol, 2), X(i, [[7.3, -.15], [16.8, -.15]], Z, 2), X(i, [[7.4, -.75], [16.8, -.75]], ol, 2), al(i, [[7.3, -.18], [16.8, -.18]], 9, sl);
		for (let e = 0; e < 5; e++) Zc(i, 9.6 + e * 1.3, -.62, 10.3 + e * 1.3, -.3, null, ol, 2);
		if (r === -1) {
			Zc(i, 6.9, -.65, 7.25, -.05, null, Z, 2);
			for (let e of [.12, -.25]) Zc(i, 7.55, e, 7.75, e + .1, "#30353a");
			a.save();
			for (let e = 0; e < 4; e++) Zc(i, 4.95 + e * .12, -.62, 5.03 + e * .12, -.5, "#202224");
			Qc(i, 4.78, -.56, (e) => {
				e.fillStyle = "#1b1c1e", e.beginPath(), e.ellipse(0, 0, .11, .07, 0, 0, Math.PI * 2), e.fill();
			}), a.restore(), il(i, 5.6, -.6, 1.1, .22, .35), Zc(i, 4.6, -.82, 5.95, -.3, null, Z, 2);
		} else Zc(i, 4.5, .12, 5.7, .3, null, Z, 2.5);
		tl(i, 8.75, -.62, .36, e), $c(i, 14.1, -.5, "NAVY", .26, e.mark, { stretch: 1.25 }), $c(i, 3.05, -.3, t.modex, .3, e.lowvis ? e.mark : "#111", { stretch: 1 });
		let p = e.lowvis ? e.mark : "#e8b31c";
		X(i, [[4.25, .05], [5.15, .05]], p, 6), Xc(i, [
			[4.12, .05],
			[4.3, .12],
			[4.3, -.02]
		], p), $c(i, 4.75, -.06, "RESCUE", .07, p);
		for (let t of [4.1, 7.6]) Qc(i, t, .3, (t) => {
			t.beginPath(), t.moveTo(0, -.11), t.lineTo(.1, .07), t.lineTo(-.1, .07), t.closePath(), t.fillStyle = e.lowvis ? e.mark : "#d22d22", t.fill(), t.fillStyle = e.lowvis ? e.upper : "#ffffff", t.beginPath(), t.moveTo(0, -.05), t.lineTo(.05, .04), t.lineTo(-.05, .04), t.closePath(), t.fill();
		});
		e.lowvis || (Xc(i, [
			[6.5, -.2],
			[6.9, -.2],
			[7.3, -.95],
			[6.9, -.95]
		], "#c8282a"), $c(i, 7.3, -.15, "DANGER", .06, "#c8282a", { align: "left" }));
		let m = "rgba(205,215,170,0.85)";
		Zc(i, 3.75, -.05, 4.45, 0, m), Zc(i, 13, -.02, 13.8, .03, m), dl(i, e, t, r, s), il(i, 18.7, -.42, 1.6, .75, .3 * e.weather + .08), rl(i, s, 300, e.weather, 7, 18, -1.2, .3, .5);
	}
	return i;
}
function Q(e, t) {
	let [n, r] = Wo(e), [, i] = Go(e);
	return [W(n, r, t), i];
}
function dl(e, t, n, r, i) {
	let a = [
		.32,
		.6,
		1,
		1.4,
		1.8,
		2
	], o = Uo.rudder, s = [
		Q(o.h0, o.x0),
		Q(o.h1, o.x0),
		Q(o.h1, 1.02),
		Q(o.h0, 1.02)
	];
	t.control && Xc(e, s, t.control), X(e, [s[0], s[1]], Z, 2.5), X(e, [Q(o.h0, o.x0), Q(o.h0, 1)], Z, 2.5), X(e, [Q(o.h1, o.x0), Q(o.h1, 1)], Z, 2.5), X(e, a.map((e) => Q(e, .08)), ol, 2), X(e, [Q(2.05, 0), Q(2.05, 1)], Z, 2), t.lowvis ? Qc(e, ...Q(1.02, .42), (e) => {
		e.lineWidth = .03, e.strokeStyle = t.mark, e.beginPath(), e.arc(0, 0, .34, 0, Math.PI * 2), e.stroke(), el(e, .26), e.stroke();
	}) : (Xc(e, [
		Q(.42, -.02),
		Q(2.3, -.02),
		Q(2.3, .72),
		Q(.42, .72)
	], "#15181c"), Xc(e, [
		Q(1.55, -.02),
		Q(1.8, -.02),
		Q(1.8, .72),
		Q(1.55, .72)
	], "#f2c230"), Qc(e, ...Q(1, .42), (e) => {
		e.fillStyle = "#f2c230", el(e, .32), e.fill();
	}));
	let c = t.lowvis ? t.mark : "#f5f5f5";
	$c(e, ...Q(1.95, .4), n.tailCode, .42, c, { stretch: 1.05 }), $c(e, ...Q(.62, .52), n.modex, .16, c), $c(e, ...Q(.45, .3), "NAVY", .08, c), nl(e, i, 60, 15.6, 18.8, .6, 2.4, t, [.1, .4], [.1, .4]);
}
function fl(e, t, n, r, i, a, o = "x", s = Z, c = 2.5) {
	let l = [];
	for (let e = 0; e <= 12; e++) {
		let s = e / 12, [c, u] = Lo(o === "x" ? W(i, a, s) : i, o === "x" ? n : W(n, r, s));
		l.push([c, t * u]);
	}
	X(e, l, s, c);
}
function pl(e, t) {
	let [n, r] = Gc.wing, i = Jc(n, r), a = i.getContext("2d"), o = Wc.wing, s = Yc(a, t ? "bottom" : "top", o), c = qc(t ? 53 : 59);
	a.fillStyle = t ? e.lower : e.upper, a.fillRect(0, 0, n, r), nl(s, c, 700, 9.8, 14.6, -9.9, 9.9, e, [.1, .5], [.2, 1.2]);
	let l = Fo;
	for (let n of [-1, 1]) {
		if (e.control) {
			let r = [];
			for (let [i, a] of l.flap.segs) {
				let o = [
					Lo(i, l.flap.x0),
					Lo(a, l.flap.x0),
					Lo(a, 1.02),
					Lo(i, 1.02)
				];
				Xc(s, o.map(([e, t]) => [e, n * t]), t ? e.lower : e.control), r.push(o);
			}
			for (let [r, i] of l.slat.segs) Xc(s, [
				Lo(r, -.02),
				Lo(i, -.02),
				Lo(i, .14),
				Lo(r, .14)
			].map(([e, t]) => [e, n * t]), t ? e.lower : e.control);
		}
		fl(s, n, .14, 0, l.slat.segs[0][0], l.slat.segs[1][1]), fl(s, n, l.flap.x0, 0, l.flap.segs[0][0], l.flap.segs[1][1]);
		for (let e of [
			l.slat.segs[0][0],
			l.slat.segs[0][1],
			l.slat.segs[1][1]
		]) fl(s, n, 0, .14, e, e, "eta");
		for (let e of [
			l.flap.segs[0][0],
			l.flap.segs[0][1],
			l.flap.segs[1][1]
		]) fl(s, n, l.flap.x0, 1, e, e, "eta");
		for (let e of [.2, .66]) {
			let t = [];
			for (let r = 0; r <= 12; r++) {
				let [i, a] = Lo(W(.12, .98, r / 12), e);
				t.push([i, n * a]);
			}
			al(s, t, 7, sl), X(s, t, ol, 1.5);
		}
		for (let e = 0; e < 6; e++) {
			let t = .22 + e * .13;
			fl(s, n, .2, .66, t, t, "eta", ol, 1.5);
		}
		if (t) for (let e = 0; e < 5; e++) {
			let [t, r] = Lo(.25 + e * .14, .35);
			Zc(s, t - .12, n * (r - .18), t + .12, n * (r + .18), null, Z, 2);
		}
		else for (let [e, t] of l.spoiler.segs) Xc(s, [
			Lo(e, l.spoiler.x0),
			Lo(t, l.spoiler.x0),
			Lo(t, l.spoiler.x1),
			Lo(e, l.spoiler.x1)
		].map(([e, t]) => [e, n * t]), null, Z, 2.5);
		fl(s, n, 0, 1, .975, .975, "eta", ol, 2);
	}
	let [u, d] = Lo(.66, .4);
	if (tl(s, u, t ? d : -d, .42, e), t && !e.lowvis) {
		let [e, t] = Lo(.62, .42);
		$c(s, e, -t, "NAVY", .55, "#1a1a1a", { stretch: 1.2 });
	}
	return rl(s, c, 160, e.weather, 10, 14.4, -9.5, 9.5), i;
}
function ml(e, n) {
	let r = new ar(e);
	return r.colorSpace = v, r.anisotropy = n, r.wrapS = r.wrapT = t, r.generateMipmaps = !0, r.minFilter = c, r;
}
function hl(e, t = 8, n = {}) {
	let r = Kc[e] || Kc.lowvis, i = {
		modex: n.modex || "101",
		tailCode: n.tailCode || "AJ"
	};
	return {
		scheme: r,
		body: {
			top: ml(cl(r), t),
			bottom: ml(ll(r), t),
			side: ml(ul(r, i), t)
		},
		wing: {
			top: ml(pl(r, !1), t),
			bottom: ml(pl(r, !0), t)
		}
	};
}
// src/f14/materials.js
var gl = "\nattribute vec3 aRef;\nvarying vec3 vRef;\nvarying vec3 vRefN;\n", _l = "\nvRef = aRef;\nvRefN = vec3(-objectNormal.x, objectNormal.z, objectNormal.y);\n", vl = "\nuniform sampler2D tLivTop;\nuniform sampler2D tLivBot;\nuniform sampler2D tLivSide;\nuniform vec4 uLivR;\nuniform vec2 uLivW;\nvarying vec3 vRef;\nvarying vec3 vRefN;\n\nvec3 liverySample() {\n  vec3 n = normalize(vRefN);\n  float u = (vRef.y - uLivR.z) / uLivR.w;\n  float v = 1.0 - (vRef.x - uLivR.x) / uLivR.y;\n  vec3 cT = texture(tLivTop, vec2(u, v)).rgb;\n  vec3 cB = texture(tLivBot, vec2(1.0 - u, v)).rgb;\n  float us = (vRef.x - uLivR.x) / uLivR.y;\n  float vs = clamp(0.5 * (vRef.z - uLivW.x) / uLivW.y, 0.002, 0.498);\n  vec2 gx = dFdx(vec2(us, vs));\n  vec2 gy = dFdy(vec2(us, vs));\n  float sideSel = n.y + 0.03 * sign(vRef.y);\n  vec3 cS = sideSel >= 0.0\n    ? textureGrad(tLivSide, vec2(1.0 - us, 0.5 + vs), gx * vec2(-1.0, 1.0), gy * vec2(-1.0, 1.0)).rgb\n    : textureGrad(tLivSide, vec2(us, vs), gx, gy).rgb;\n  float wT = pow(max(n.z, 0.0), 4.0);\n  float wB = pow(max(-n.z, 0.0), 4.0);\n  float wS = pow(abs(n.y), 4.0) + pow(abs(n.x), 4.0);\n  return (cT * wT + cB * wB + cS * wS) / (wT + wB + wS + 1e-5);\n}\n", yl = "\nuniform sampler2D tLivTop;\nuniform sampler2D tLivBot;\nuniform vec4 uLivR;\nvarying vec3 vRef;\nvarying vec3 vRefN;\n\nvec3 liverySample() {\n  vec3 n = normalize(vRefN);\n  float u = (vRef.y - uLivR.z) / uLivR.w;\n  float v = 1.0 - (vRef.x - uLivR.x) / uLivR.y;\n  vec3 cT = texture(tLivTop, vec2(u, v)).rgb;\n  vec3 cB = texture(tLivBot, vec2(1.0 - u, v)).rgb;\n  return mix(cB, cT, smoothstep(-0.25, 0.25, n.z));\n}\n";
function bl(e, t, n = {}) {
	let r = new zi({
		color: 16777215,
		roughness: .62,
		metalness: .08,
		...n
	});
	return r.onBeforeCompile = (n) => {
		Object.assign(n.uniforms, t), n.vertexShader = n.vertexShader.replace("#include <common>", `#include <common>\n${gl}`).replace("#include <beginnormal_vertex>", `#include <beginnormal_vertex>\n${_l}`), n.fragmentShader = n.fragmentShader.replace("#include <common>", `#include <common>\n${e === "wing" ? yl : vl}`).replace("#include <map_fragment>", "#include <map_fragment>\ndiffuseColor.rgb *= liverySample();");
	}, r.customProgramCacheKey = () => `f14-livery-${e}`, r.userData.livery = e, r;
}
var xl = "\nvarying vec2 vUv;\nvarying vec3 vN;\nvarying vec3 vV;\nvoid main() {\n  vUv = uv;\n  vec4 mv = modelViewMatrix * vec4(position, 1.0);\n  vN = normalize(normalMatrix * normal);\n  vV = normalize(-mv.xyz);\n  gl_Position = projectionMatrix * mv;\n}\n", Sl = "\nuniform float uTime;\nuniform float uAB;\nuniform float uGain;\nuniform float uDiamonds;\nuniform float uPow;\nuniform vec3 uHot;\nuniform vec3 uCool;\nvarying vec2 vUv;\nvarying vec3 vN;\nvarying vec3 vV;\n\nfloat hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\nfloat noise(vec2 p) {\n  vec2 i = floor(p);\n  vec2 f = fract(p);\n  f = f * f * (3.0 - 2.0 * f);\n  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);\n}\n\nvoid main() {\n  float x = vUv.y;\n  float facing = abs(dot(normalize(vN), normalize(vV)));\n  float body = pow(facing, uPow);\n  float n = noise(vec2(vUv.x * 9.0, x * 7.0 - uTime * 14.0)) * 0.6 + noise(vec2(vUv.x * 23.0, x * 19.0 - uTime * 31.0)) * 0.4;\n  float fall = pow(clamp(1.0 - x, 0.0, 1.0), 1.4) * smoothstep(0.0, 0.05, x + 0.01);\n  float diamonds = uDiamonds > 0.0 ? 0.55 + 0.45 * pow(0.5 + 0.5 * cos(x * 6.2831 * uDiamonds), 3.0) * (1.0 - x) : 1.0;\n  float k = fall * body * diamonds * (0.75 + 0.5 * n) * uAB * uGain;\n  vec3 col = mix(uHot, uCool, smoothstep(0.0, 0.8, x));\n  gl_FragColor = vec4(col * k, 1.0);\n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n}\n";
function Cl(e) {
	return new Ri({
		uniforms: {
			uTime: { value: 0 },
			uAB: { value: 0 },
			uGain: { value: e.gain },
			uDiamonds: { value: e.diamonds || 0 },
			uPow: { value: e.pow || 1.5 },
			uHot: { value: new St(e.hot) },
			uCool: { value: new St(e.cool) }
		},
		vertexShader: xl,
		fragmentShader: Sl,
		transparent: !0,
		depthWrite: !1,
		blending: 2,
		side: 2
	});
}
function wl() {
	let t = document.createElement("canvas");
	t.width = 64, t.height = 4;
	let n = t.getContext("2d");
	n.fillStyle = "#e0b51e", n.fillRect(0, 0, 64, 4), n.fillStyle = "#141414";
	for (let e = 0; e < 64; e += 16) n.fillRect(e, 0, 8, 4);
	let r = new ar(t);
	return r.colorSpace = v, r.wrapS = r.wrapT = e, r.repeat.set(3, 1), r;
}
function Tl(e, t = "lowvis") {
	let n = Math.min(16, e.capabilities.getMaxAnisotropy()), r = Wc.body, i = Wc.wing, a = {
		tLivTop: { value: null },
		tLivBot: { value: null },
		tLivSide: { value: null },
		uLivR: { value: new Ue(r.s0, r.S, r.y0, r.Y) },
		uLivW: { value: new I(r.w0, r.Wr) }
	}, o = {
		tLivTop: { value: null },
		tLivBot: { value: null },
		uLivR: { value: new Ue(i.s0, i.S, i.y0, i.Y) }
	}, s = (e) => new zi(e), c = {
		body: bl("body", a),
		bodyDouble: bl("body", a, { side: 2 }),
		wing: bl("wing", o),
		metal: s({
			color: 9146001,
			metalness: .85,
			roughness: .38
		}),
		metalDark: s({
			color: 3882304,
			metalness: .6,
			roughness: .55
		}),
		chrome: s({
			color: 14869218,
			metalness: 1,
			roughness: .12
		}),
		nozzle: s({
			color: 16777215,
			vertexColors: !0,
			metalness: .65,
			roughness: .52,
			envMapIntensity: .75
		}),
		nozzleInner: s({
			color: 16777215,
			vertexColors: !0,
			metalness: .2,
			roughness: .85,
			envMapIntensity: .06
		}),
		duct: s({
			color: 16777215,
			vertexColors: !0,
			metalness: 0,
			roughness: .7
		}),
		gear: s({
			color: 15263971,
			metalness: .05,
			roughness: .5
		}),
		rubber: s({
			color: 1842204,
			metalness: 0,
			roughness: .93,
			side: 2
		}),
		hub: s({
			color: 13619146,
			metalness: .35,
			roughness: .45
		}),
		well: s({
			color: 14276818,
			metalness: .05,
			roughness: .72,
			side: 2
		}),
		lamp: s({
			color: 16777215,
			emissive: 16774108,
			emissiveIntensity: 0,
			metalness: .3,
			roughness: .08
		}),
		navRed: s({
			color: 16722463,
			emissive: 16718352,
			emissiveIntensity: 2,
			roughness: .25
		}),
		navGreen: s({
			color: 2817882,
			emissive: 1113920,
			emissiveIntensity: 2,
			roughness: .25
		}),
		navWhite: s({
			color: 16777215,
			emissive: 16777215,
			emissiveIntensity: 1.5,
			roughness: .25
		}),
		beacon: s({
			color: 16719888,
			emissive: 16715776,
			emissiveIntensity: 0,
			roughness: .2
		}),
		frame: s({
			color: 7041657,
			metalness: .1,
			roughness: .6
		}),
		cockpit: s({
			color: 2895667,
			metalness: .05,
			roughness: .82
		}),
		coaming: s({
			color: 1776670,
			metalness: 0,
			roughness: .95
		}),
		hud: s({
			color: 10485696,
			emissive: 3211120,
			emissiveIntensity: .35,
			transparent: !0,
			opacity: .28,
			depthWrite: !1,
			side: 2,
			roughness: .05
		}),
		seat: s({
			color: 2763565,
			metalness: .1,
			roughness: .75
		}),
		seatPad: s({
			color: 6116664,
			metalness: 0,
			roughness: .9
		}),
		yellowBlack: s({
			color: 16777215,
			map: wl(),
			metalness: 0,
			roughness: .5
		}),
		display: s({
			color: 462859,
			emissive: 3985274,
			emissiveIntensity: .18,
			metalness: .2,
			roughness: .12
		}),
		gauge: s({
			color: 789774,
			metalness: .1,
			roughness: .25
		}),
		consoleTop: s({
			color: 3817027,
			metalness: .05,
			roughness: .7
		}),
		suit: s({
			color: 5593404,
			metalness: 0,
			roughness: .92
		}),
		harness: s({
			color: 3883049,
			metalness: 0,
			roughness: .85
		}),
		helmet: s({
			color: 14211282,
			metalness: 0,
			roughness: .35
		}),
		mask: s({
			color: 2500134,
			metalness: 0,
			roughness: .6
		}),
		visorGold: s({
			color: 14198080,
			metalness: 1,
			roughness: .12
		}),
		visorDark: s({
			color: 1184274,
			metalness: .6,
			roughness: .08
		}),
		glassTint: new An({
			color: 2371899,
			transparent: !0,
			opacity: .2,
			depthWrite: !1,
			side: 2
		}),
		glassReflect: s({
			color: 0,
			metalness: 0,
			roughness: .05,
			transparent: !0,
			blending: 2,
			depthWrite: !1,
			envMapIntensity: 1.6
		}),
		sensorGlass: s({
			color: 724756,
			metalness: .4,
			roughness: .06
		}),
		paintLower: s({
			color: 10265513,
			metalness: .08,
			roughness: .62
		}),
		missileWhite: s({
			color: 15658730,
			metalness: .05,
			roughness: .45
		}),
		missileGrey: s({
			color: 10133153,
			metalness: .1,
			roughness: .55
		}),
		seeker: s({
			color: 1382428,
			metalness: .2,
			roughness: .2
		}),
		bandYellow: s({
			color: 14264348,
			metalness: 0,
			roughness: .5
		}),
		bandBrown: s({
			color: 7031339,
			metalness: 0,
			roughness: .6
		}),
		flameHolder: s({
			color: 1907482,
			emissive: 16735516,
			emissiveIntensity: .1,
			metalness: .4,
			roughness: .6
		}),
		flameOuter: Cl({
			hot: 16747068,
			cool: 8006282,
			gain: .55,
			pow: 1.2
		}),
		flameMid: Cl({
			hot: 16760944,
			cool: 16733472,
			gain: .9,
			pow: 1.6,
			diamonds: 4
		}),
		flameCore: Cl({
			hot: 16773840,
			cool: 16752704,
			gain: 1.6,
			pow: 2.2,
			diamonds: 4
		})
	};
	c.store = c.paintLower, c.setFlame = (e, t) => {
		for (let n of [
			c.flameOuter,
			c.flameMid,
			c.flameCore
		]) n.uniforms.uAB.value = e, n.uniforms.uTime.value = t;
	};
	let l = null;
	return c.setLivery = (e, t = {}) => {
		let r = hl(e, n, t);
		if (l) for (let e of [
			l.body.top,
			l.body.bottom,
			l.body.side,
			l.wing.top,
			l.wing.bottom
		]) e.dispose();
		l = r, a.tLivTop.value = r.body.top, a.tLivBot.value = r.body.bottom, a.tLivSide.value = r.body.side, o.tLivTop.value = r.wing.top, o.tLivBot.value = r.wing.bottom;
		let i = r.scheme, s = i.lowvis ? .66 : .4;
		for (let e of [
			c.body,
			c.bodyDouble,
			c.wing,
			c.paintLower
		]) e.roughness = s;
		return c.paintLower.color.set(i.lower), c.frame.color.set(i.upper), c.helmet.color.set(i.lowvis ? 9343638 : 14869212), i;
	}, c.setLivery(t), c.schemes = Kc, c.liveryUniforms = {
		body: a,
		wing: o
	}, c;
}
function El(e) {
	return !!(e && e.userData && e.userData.livery);
}
// src/f14/F14.js
function Dl(e) {
	let t = [
		[0, 20],
		[.7, 20],
		[.8, 35],
		[.9, 55],
		[1, 68]
	];
	if (e >= 1) return 68;
	for (let n = 0; n < t.length - 1; n++) if (e <= t[n + 1][0]) return W(t[n][1], t[n + 1][1], (e - t[n][0]) / (t[n + 1][0] - t[n][0]));
	return 68;
}
function Ol(e, t) {
	let n = -Infinity;
	return e <= 18 && Math.abs(t) < ns(e).a && (n = rs(e, t)), e >= 16.6 && e <= 19.1 && Math.abs(t) < Hs.hw(e) && (n = Math.max(n, Hs.wc + Us(e, t))), n;
}
function kl(e, t) {
	let n = Infinity;
	return e <= 18 && Math.abs(t) < ns(e).a && (n = is(e, t)), e >= 16.6 && e <= 19.1 && Math.abs(t) < Hs.hw(e) && (n = Math.min(n, Hs.wc - Us(e, t))), n;
}
function Al(e, t, n, r, i, a, o = 10, s = 12) {
	let c = a > 0 ? .006 : .018, l = a > 0 ? .018 : .006;
	return So(K(e, t, o).map((e) => {
		let t = K(n, r, s), a = t.slice().reverse().map((t) => [
			e,
			t,
			i(e, t) + c
		]), o = t.map((t) => [
			e,
			t,
			i(e, t) - l
		]);
		return [
			...a,
			a[a.length - 1],
			o[0],
			...o,
			o[o.length - 1],
			a[0]
		];
	}), {
		closed: !0,
		capStart: !0,
		capEnd: !0
	});
}
function jl(e) {
	e.updateMatrixWorld(!0);
	let t = e.matrixWorld.clone().invert(), n = new L();
	e.traverse((e) => {
		if (!e.isMesh || !El(e.material) || e.geometry.attributes.aRef) return;
		let r = e.geometry.clone();
		r.applyMatrix4(e.matrix), e.position.set(0, 0, 0), e.quaternion.identity(), e.scale.set(1, 1, 1), e.updateMatrix(), e.updateMatrixWorld(!0);
		let i = t.clone().multiply(e.parent.matrixWorld), a = r.attributes.position, o = new Float32Array(a.count * 3);
		for (let e = 0; e < a.count; e++) n.fromBufferAttribute(a, e).applyMatrix4(i), o[3 * e] = -n.x, o[3 * e + 1] = n.z, o[3 * e + 2] = n.y;
		r.setAttribute("aRef", new rn(o, 3)), r.computeVertexNormals(), e.geometry = r;
	});
}
function Ml(e, t = !0, n = !0) {
	e.traverse((e) => {
		e.isMesh && (e.castShadow = t, e.receiveShadow = n);
	});
}
var Nl = class {
	constructor(e, t = {}) {
		let n = this.mats = Tl(e, t.livery || "lowvis");
		this.root = new R(), this.root.name = "F-14 Tomcat";
		let r = this.airframe = new R();
		r.name = "airframe", r.position.set(Po.centerS, -Po.groundW, 0), this.root.add(r);
		let i = (e, t, n, i = r) => {
			let a = ko(e, t, null, n);
			return i.add(a), a;
		};
		i(os(), n.body, "fuselage");
		let a = Is();
		i(a.starboard, n.body, "nacelleGloveR"), i(a.port, n.body, "nacelleGloveL");
		let o = Bs(a.frontRing), s = Co(o.duct), c = Co(o.lip);
		i(o.duct, n.duct, "intakeDuctR").castShadow = !1, i(s, n.duct, "intakeDuctL").castShadow = !1, i(o.lip, n.body, "intakeLipR"), i(c, n.body, "intakeLipL"), i(Ws(), n.body, "beaverTail");
		let l = Gs();
		i(l.starboard, n.body, "boomR"), i(l.port, n.body, "boomL");
		let u = qs();
		i(u.starboard, n.body, "finFairingR"), i(u.port, n.body, "finFairingL");
		for (let e of [1, -1]) dc(e, r, n);
		this.buildTCS(r), this.buildDetails(r), this.wings = [tc(1, n), tc(-1, n)];
		for (let e of this.wings) r.add(e.group);
		this.stabs = [ac(1, r, n), ac(-1, r, n)], this.fins = [lc(1, r, n), lc(-1, r, n)], this.engines = Uc(r, n), this.noseGear = _c(r, n), this.mainGear = [vc(r, 1, n), vc(r, -1, n)], this.cockpit = Ic(r, n), this.buildSpeedBrakes(r), this.buildHook(r), this.stores = this.buildStores(r), jl(r), this.state = {
			sweepMode: "auto",
			mach: .4,
			manualSweep: 20,
			flaps: "up",
			gearDown: !0,
			canopyOpen: !1,
			hookDown: !1,
			speedBrake: !1,
			throttle: .3,
			afterburner: 0,
			pitch: 0,
			roll: 0,
			yaw: 0,
			tanks: !0,
			lights: !0
		}, this.pos = {
			sweep: 20,
			flap: 0,
			aux: 0,
			slat: 0,
			gear: 1,
			canopy: 0,
			hook: 0,
			speedBrake: 0,
			ab: 0,
			throttle: .3,
			stabR: 0,
			stabL: 0,
			rudder: 0,
			spoilerR: 0,
			spoilerL: 0
		}, this.info = {
			sweepTarget: 20,
			maxSweep: No.over,
			notes: []
		}, this.time = 0, this.setTanks(!0), this.update(0, !0);
	}
	buildTCS(e) {
		let t = G([
			[2.6, .1],
			[2.63, .112],
			[2.75, .115],
			[3.1, .115],
			[3.35, .06],
			[3.45, .01]
		]), n = -.92, r = K(2.6, 3.45, 18).map((e) => {
			let r = t(e);
			return Oo(e, 0, n, r, r * .9, r * .85, 2.3, 28);
		});
		e.add(ko(So(r, {
			closed: !0,
			capStart: !0,
			capEnd: !0
		}), this.mats.body, null, "tcsPod"));
		let i = new B(new cr(.075, 24), this.mats.sensorGlass);
		i.position.copy(J([
			2.597,
			0,
			n
		])), i.rotation.y = Math.PI / 2, i.scale.set(1, .85, 1), e.add(i);
	}
	buildDetails(e) {
		let t = this.mats, n = new Ai(.055, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), r = new B(n, t.beacon);
		r.position.copy(J([
			13.4,
			0,
			rs(13.4, 0) - .01
		]));
		let i = new B(n, t.beacon);
		i.position.copy(J([
			9.3,
			0,
			is(9.3, 0) + .01
		])), i.rotation.x = Math.PI, e.add(r, i), this.beacons = [r, i];
		for (let n of [1, -1]) {
			let r = ns(2.75), i = [
				2.75,
				n * (r.a - .01),
				r.wMax + .05
			], a = new B(new lr(.008, .011, .11, 8), t.metal);
			a.rotation.x = Math.PI / 2, a.position.copy(J([
				i[0],
				i[1] + n * .05,
				i[2]
			]));
			let o = new B(new lr(.009, .009, .22, 8), t.metal);
			o.rotation.z = Math.PI / 2, o.position.copy(J([
				i[0] - .1,
				i[1] + n * .1,
				i[2]
			])), e.add(a, o);
		}
		let a = (n, r, i, a) => {
			let o = new Vr();
			o.moveTo(0, 0), o.lineTo(.22, 0), o.lineTo(.1, i), o.lineTo(.04, i), o.closePath();
			let s = new wi(o, {
				depth: .012,
				bevelEnabled: !1
			});
			s.translate(-.11, 0, -.006);
			let c = new B(s, t.metalDark);
			c.position.copy(J([
				n,
				0,
				r
			])), a && (c.rotation.x = Math.PI), c.castShadow = !0, e.add(c);
		};
		a(11.2, rs(11.2, 0) - .01, .16, !1), a(7.2, is(7.2, 0) + .01, .14, !0), a(13, is(13, 0) + .01, .12, !0);
	}
	buildSpeedBrakes(e) {
		let t = this.mats, n = [], r = 16.9, i = Al(r, 18, -.42, .42, Ol, 1, 12, 16), a = [
			r,
			0,
			Ol(r, 0) - .01
		], o = new R();
		o.position.copy(J(a)), o.add(jo(i, t.body, a, "speedBrakeUpper")), e.add(o), n.push({
			obj: o,
			dir: -1,
			max: 60 * mo
		});
		for (let r of [1, -1]) {
			let i = Al(17, 17.95, .13, .56, kl, -1, 10, 10);
			r === -1 && (i = Co(i));
			let a = [
				17,
				r * .35,
				kl(17, .35) + .012
			], o = new R();
			o.position.copy(J(a)), o.add(jo(i, t.body, a, "speedBrakeLower")), e.add(o), n.push({
				obj: o,
				dir: 1,
				max: 60 * mo
			});
		}
		this.speedBrakes = n;
	}
	buildHook(e) {
		let t = this.mats, n = [
			16.3,
			0,
			-.74
		], r = [
			18.75,
			0,
			-.56
		], i = new R();
		i.position.copy(J(n)), e.add(i);
		let a = new L(), o = J(r).sub(J(n)), s = o.length(), c = o.clone().normalize();
		for (let e = 0; e < 7; e++) {
			let n = e / 7, r = (e + 1) / 7, o = W(.045, .034, n), l = new B(new lr(W(.045, .034, r), o, s / 7, 12), e % 2 ? t.coaming : t.gear);
			l.position.copy(a).addScaledVector(c, (n + r) / 2 * s), l.quaternion.setFromUnitVectors(new L(0, 1, 0), c), i.add(l);
		}
		let l = new B(new ji(.06, .028, 8, 16, Math.PI * 1.1), t.metal);
		l.position.copy(o).add(new L(-.02, -.03, 0)), l.rotation.z = Math.PI * .62, i.add(l);
		let u = new B(new or(.5, .2, .16), t.body);
		u.position.copy(J([
			16.35,
			0,
			-.64
		])), e.add(u), Ml(i), this.hook = i;
	}
	buildStores(e) {
		let t = this.mats, n = new R();
		n.name = "stores", e.add(n);
		let r = 4.3, i = .3, a = (e) => {
			let t = (e - 9) / r;
			return t < .3 ? i * (1 - (1 - t / .3) ** 2) ** .62 : t > .68 ? i * (1 - .86 * ((t - .68) / .32) ** 1.7) : i;
		}, o = Y.yc(11), s = Y.wc(11) - Y.awB(11), c = s - .13 - i, l = [];
		for (let e = 0; e <= 40; e++) l.push(9 + r * (.5 - .5 * Math.cos(Math.PI * e / 40)));
		let u = () => So(l.map((e) => {
			let t = Math.max(a(e), .003);
			return Oo(e, o, c, t, t, t, 2, 36);
		}), {
			closed: !0,
			capStart: !0,
			capEnd: !0
		}), d = () => So(K(c + i - .03, s + .08, 4).map((e) => {
			let t = [], n = 9.9, r = 11.9;
			for (let i = 0; i <= 12; i++) {
				let a = i / 12, s = .035 * Math.sqrt(Math.max(0, 1 - (2 * a - 1) ** 2)) + .004;
				t.push([
					W(n, r, a),
					o - s,
					e
				]);
			}
			for (let i = 12; i >= 0; i--) {
				let a = i / 12, s = .035 * Math.sqrt(Math.max(0, 1 - (2 * a - 1) ** 2)) + .004;
				t.push([
					W(n, r, a),
					o + s,
					e
				]);
			}
			return t;
		}), {
			closed: !0,
			capStart: !0,
			capEnd: !0
		}), f = u(), p = Co(f), m = d(), h = Co(m);
		return n.add(ko(f, t.store, null, "tankR")), n.add(ko(p, t.store, null, "tankL")), n.add(ko(m, t.store, null, "pylonR")), n.add(ko(h, t.store, null, "pylonL")), { tanks: n };
	}
	setTanks(e) {
		this.state.tanks = e, this.stores.tanks.visible = e;
	}
	setLivery(e, t) {
		return this.mats.setLivery(e, t);
	}
	sweepTarget() {
		let e = this.state, t = Dl(e.mach), n;
		switch (e.sweepMode) {
			case "manual":
				n = Math.max(ho(e.manualSweep, No.min, No.max), t);
				break;
			case "bomb":
				n = Math.max(No.bomb, t);
				break;
			case "oversweep":
				n = e.gearDown && this.pos.gear > .99 && e.flaps === "up" ? No.over : No.max;
				break;
			default: n = t;
		}
		return e.flaps === "full" ? n = No.min : e.flaps === "maneuver" && (n = Math.min(n, 50)), n;
	}
	update(e, t = !1) {
		let n = this.state, r = this.pos;
		this.time += e;
		let i = this.time, a = (n, r, i) => t ? r : xo(n, r, i, e), o = [];
		for (let e = 0; e < (t ? 3 : 1); e++) {
			let e = this.sweepTarget(), t = n.flaps === "full" ? 35 : n.flaps === "maneuver" ? 10 : 0, i = n.flaps === "full" ? 17 : n.flaps === "maneuver" ? 7 : 0, s = n.flaps === "full" ? 35 : 0;
			(e > 21.5 || r.sweep > 21.6) && (s = 0, t = Math.min(t, 10), i = Math.min(i, 7)), (e > 50 || r.sweep > 50.1) && (t = 0, i = 0), r.aux = a(r.aux, s, 12), r.flap = a(r.flap, t, 12), r.slat = a(r.slat, i, 6);
			let c = No.over;
			r.aux > .2 || r.flap > 10.2 || r.slat > 7.2 ? c = 21.5 : (r.flap > .2 || r.slat > .2) && (c = 50);
			let l = Math.min(e, c);
			l < e - .01 && o.push("Sweep held until flaps/slats retract"), r.sweep = a(r.sweep, l, 10), this.info.sweepTarget = e, this.info.maxSweep = c;
		}
		n.sweepMode === "oversweep" && r.sweep < No.over - .01 && this.sweepTarget() < No.over && o.push("Oversweep needs gear down & flaps up"), n.sweepMode === "manual" && n.manualSweep < Dl(n.mach) - .5 && o.push("Manual sweep limited by Mach schedule"), r.gear = a(r.gear, +!!n.gearDown, .22), r.canopy = a(r.canopy, +!!n.canopyOpen, .18), r.hook = a(r.hook, +!!n.hookDown, .9), r.speedBrake = a(r.speedBrake, +!!n.speedBrake, .9), r.throttle = a(r.throttle, n.throttle, .6), r.ab = a(r.ab, n.afterburner, .9);
		let s = n.pitch >= 0 ? 24 * n.pitch : 10 * n.pitch, c = r.sweep < 57, l = (c ? 9 : 15) * n.roll, u = ho(s + l, -12, 33), d = ho(s - l, -12, 33);
		r.stabR = a(r.stabR, u, 50), r.stabL = a(r.stabL, d, 50), r.rudder = a(r.rudder, 30 * n.yaw, 70);
		let f = c ? 55 * Math.max(n.roll, 0) : 0, p = c ? 55 * Math.max(-n.roll, 0) : 0;
		r.spoilerR = a(r.spoilerR, f, 110), r.spoilerL = a(r.spoilerL, p, 110), !c && Math.abs(n.roll) > .01 && o.push("Spoilers locked out above 57° sweep"), this.info.notes = o, this.apply(i);
	}
	apply(e) {
		let t = this.pos, n = this.state, r = (t.sweep - No.ref) * mo, [i, a] = this.wings;
		i.group.rotation.y = -r, a.group.rotation.y = r;
		for (let e of this.wings) {
			e.hinges.flaps[0].userData.set(t.aux * mo), e.hinges.flaps[1].userData.set(t.flap * mo);
			for (let n of e.hinges.slats) n.userData.set(-t.slat * mo);
			let n = e.side === 1 ? t.spoilerR : t.spoilerL;
			for (let t of e.hinges.spoilers) t.userData.set(-n * mo), t.visible = n > .3;
		}
		this.stabs[0].userData.set(-t.stabR * mo), this.stabs[1].userData.set(-t.stabL * mo), this.fins[0].rudder.userData.set(t.rudder * mo), this.fins[1].rudder.userData.set(-t.rudder * mo), this.noseGear.set(t.gear);
		for (let e of this.mainGear) e.set(t.gear);
		this.cockpit.canopyHinge.userData.set(22 * mo * _o(0, 1, t.canopy)), this.hook.rotation.z = 40 * mo * _o(0, 1, t.hook);
		for (let e of this.speedBrakes) e.obj.rotation.z = e.dir * e.max * _o(0, 1, t.speedBrake);
		this.engines.update(t.throttle, t.ab, e);
		let o = n.lights, s = o && e * 1.1 % 1 < .09 ? 9 : 0;
		this.mats.beacon.emissiveIntensity = s, this.mats.lamp.emissiveIntensity = o && t.gear > .98 ? 3 : 0;
		for (let e of [
			this.mats.navRed,
			this.mats.navGreen,
			this.mats.navWhite
		]) e.emissiveIntensity = o ? 2 : 0;
	}
}, Pl = { capabilities: { getMaxAnisotropy: () => 8 } };
function Fl(e, t) {
	let n = Math.round(Math.max(...e.map((e) => e.x + e.img.width)) * t), r = Math.round(Math.max(...e.map((e) => e.y + e.img.height)) * t), i = document.createElement("canvas");
	i.width = n, i.height = r;
	let a = i.getContext("2d"), o = {};
	for (let i of e) {
		let e = i.x * t, s = i.y * t, c = i.img.width * t, l = i.img.height * t;
		a.drawImage(i.img, e, s, c, l);
		let u = 1.5 / c, d = 1.5 / l;
		o[i.key] = (t, i) => (t = Math.min(1 - u, Math.max(u, t)), i = Math.min(1 - d, Math.max(d, i)), [(e + t * c) / n, 1 - (s + (1 - i) * l) / r]);
	}
	let s = new ar(i);
	return s.colorSpace = v, s.userData.mimeType = "image/jpeg", {
		tex: s,
		map: o
	};
}
var Il = [
	"top",
	"bottom",
	"starboard",
	"port"
];
function Ll(e, t, n) {
	let r = e.attributes.position, i = e.attributes.normal, a = e.attributes.aRef, o = e.index ? e.index.array : Array.from({ length: r.count }, (e, t) => t), s = t === "wing" ? Wc.wing : Wc.body, c = [], l = [], u = [], d = [], f = /* @__PURE__ */ new Map(), p = (e, t) => {
		let r = a.getX(e), i = a.getY(e), o = a.getZ(e), c = (i - s.y0) / s.Y, l = 1 - (r - s.s0) / s.S;
		if (t === "top") return n.map.top(c, l);
		if (t === "bottom") return n.map.bottom(1 - c, l);
		let u = (r - s.s0) / s.S, d = Math.min(.498, Math.max(.002, .5 * (o - s.w0) / s.Wr));
		return t === "starboard" ? n.map.side(1 - u, .5 + d) : n.map.side(u, d);
	};
	for (let e = 0; e < o.length; e += 3) {
		let n = [
			o[e],
			o[e + 1],
			o[e + 2]
		], s = 0, m = 0, h = 0, g = 0;
		for (let e of n) s -= i.getX(e), m += i.getZ(e), h += i.getY(e), g += a.getY(e);
		let _;
		if (t === "wing") _ = h >= 0 ? "top" : "bottom";
		else {
			let e = Math.hypot(s, m, h) || 1, t = Math.max(h / e, 0) ** 4, n = Math.max(-h / e, 0) ** 4, r = Math.abs(m / e) ** 4 + Math.abs(s / e) ** 4;
			_ = r >= t && r >= n ? m / e + .03 * Math.sign(g) >= 0 ? "starboard" : "port" : t >= n ? "top" : "bottom";
		}
		let v = Il.indexOf(_);
		for (let e of n) {
			let t = e * 4 + v, n = f.get(t);
			n === void 0 && (n = c.length / 3, f.set(t, n), c.push(r.getX(e), r.getY(e), r.getZ(e)), l.push(i.getX(e), i.getY(e), i.getZ(e)), u.push(...p(e, _))), d.push(n);
		}
	}
	let m = new vn();
	return m.setAttribute("position", new z(c, 3)), m.setAttribute("normal", new z(l, 3)), m.setAttribute("uv", new z(u, 2)), m.setIndex(d), m;
}
async function Rl(e = {}) {
	let { livery: t = "lowvis", tanks: n = !0, crew: r = !0, textureScale: i = .5 } = e, a = new Nl(Pl, { livery: t });
	a.setTanks(n), a.cockpit.crew.visible = r;
	let o = a.mats, s = o.liveryUniforms.body, c = o.liveryUniforms.wing, l = s.tLivTop.value.image, u = Fl([
		{
			key: "top",
			img: l,
			x: 0,
			y: 0
		},
		{
			key: "bottom",
			img: s.tLivBot.value.image,
			x: l.width,
			y: 0
		},
		{
			key: "side",
			img: s.tLivSide.value.image,
			x: 0,
			y: l.height
		}
	], i), d = c.tLivTop.value.image, f = Fl([{
		key: "top",
		img: d,
		x: 0,
		y: 0
	}, {
		key: "bottom",
		img: c.tLivBot.value.image,
		x: 0,
		y: d.height
	}], i), p = /* @__PURE__ */ new Map([
		[o.flameOuter, [16742958, .28]],
		[o.flameMid, [16756816, .45]],
		[o.flameCore, [16773320, .75]]
	]), m = /* @__PURE__ */ new Map(), h = (e) => {
		if (m.has(e)) return m.get(e);
		let t = e, n = e.userData && e.userData.livery;
		if (n) t = new zi({
			map: (n === "wing" ? f : u).tex,
			roughness: e.roughness,
			metalness: e.metalness,
			side: e.side
		});
		else if (p.has(e)) {
			let [n, r] = p.get(e);
			t = new An({
				color: n,
				transparent: !0,
				opacity: r,
				depthWrite: !1,
				side: 2
			});
		} else e === o.glassTint ? t = new zi({
			color: 2766916,
			transparent: !0,
			opacity: .28,
			metalness: 0,
			roughness: .05,
			side: 2,
			depthWrite: !1
		}) : e.isMeshStandardMaterial && e.emissiveIntensity > 1 && (t = e.clone(), t.emissiveIntensity = 1);
		return m.set(e, t), t;
	}, g = /* @__PURE__ */ new Map(), _ = [];
	a.root.traverse((e) => {
		if (e.isLight && _.push(e), !e.isMesh) return;
		if (e.material === o.glassReflect) {
			_.push(e);
			return;
		}
		let t = e.material.userData && e.material.userData.livery;
		if (t && e.geometry.attributes.aRef) {
			let n = e.geometry.uuid + t;
			g.has(n) || g.set(n, Ll(e.geometry, t, t === "wing" ? f : u)), e.geometry = g.get(n);
		} else e.geometry.attributes.aRef && (e.geometry = e.geometry.clone(), e.geometry.deleteAttribute("aRef"));
		e.material = h(e.material);
	});
	for (let e of _) e.removeFromParent();
	let v = /* @__PURE__ */ new Map(), y = 0;
	return a.root.traverse((e) => {
		e.name = `${(e.name || e.type).replace(/[^\w-]/g, "_")}_${y++}`, v.set(e.name, e);
	}), a.update(0, !0), a.root.updateMatrixWorld(!0), {
		glb: await new Na().parseAsync(a.root, {
			binary: !0,
			onlyVisible: !1,
			maxTextureSize: 4096
		}),
		jet: a,
		nodes: v
	};
}
// src/cesium/sim.js
var zl = 9.80665, Bl = 6371e3, $ = Math.PI / 180, Vl = (e, t, n) => Math.min(n, Math.max(t, e)), Hl = (e, t, n) => {
	let r = Vl((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
}, Ul = (e) => Math.atan2(Math.sin(e), Math.cos(e)), Wl = (e, t, n, r) => e + Vl(t - e, -n * r, n * r);
function Gl(e, t, n, r) {
	let i = Math.sin(r - t) * Math.cos(n), a = Math.cos(e) * Math.sin(n) - Math.sin(e) * Math.cos(n) * Math.cos(r - t);
	return Math.atan2(i, a);
}
function Kl(e, t, n, r) {
	let i = Math.sin((n - e) / 2) ** 2 + Math.cos(e) * Math.cos(n) * Math.sin((r - t) / 2) ** 2;
	return 2 * Bl * Math.asin(Math.min(1, Math.sqrt(i)));
}
function ql(e, t, n, r) {
	let i = r / Bl, a = Math.asin(Math.sin(e) * Math.cos(i) + Math.cos(e) * Math.sin(i) * Math.cos(n));
	return [a, t + Math.atan2(Math.sin(n) * Math.sin(i) * Math.cos(e), Math.cos(i) - Math.sin(e) * Math.sin(a))];
}
var Jl = class {
	constructor({ name: e, lat0: t, lon0: n, h0: r, lat1: i, lon1: a, h1: o, width: s = 61 }) {
		Object.assign(this, {
			name: e,
			lat0: t,
			lon0: n,
			h0: r,
			lat1: i,
			lon1: a,
			h1: o,
			width: s
		}), this.heading = Gl(t, n, i, a), this.length = Kl(t, n, i, a);
	}
	local(e, t) {
		let n = Kl(this.lat0, this.lon0, e, t), r = Gl(this.lat0, this.lon0, e, t) - this.heading;
		return {
			along: n * Math.cos(r),
			cross: n * Math.sin(r)
		};
	}
	height(e) {
		let t = Vl(e / this.length, 0, 1), n = this.profile;
		if (!n || n.length < 2) return this.h0 + (this.h1 - this.h0) * t;
		let r = t * (n.length - 1), i = Math.min(n.length - 2, Math.floor(r));
		return n[i] + (n[i + 1] - n[i]) * (r - i);
	}
	samplePoints(e = 25) {
		return Array.from({ length: e }, (t, n) => this.point(n / (e - 1) * this.length));
	}
	setProfile(e) {
		this.profile = e.slice(), this.h0 = e[0], this.h1 = e[e.length - 1];
	}
	contains(e, t, n = 30) {
		let { along: r, cross: i } = this.local(e, t);
		return r > -n && r < this.length + n && Math.abs(i) < this.width / 2 + n;
	}
	point(e, t = 0) {
		let [n, r] = ql(this.lat0, this.lon0, this.heading, e);
		return t ? ql(n, r, this.heading + Math.PI / 2, t) : [n, r];
	}
}, Yl = {
	thrustMil: 5,
	thrustAB: 3.8,
	cd0: 61e-6,
	cdi: 16e3,
	vStallClean: 72,
	vStallFlaps: 58,
	nMax: 7,
	nMin: -3,
	rollRate: 150 * $,
	rotateSpeed: 70
};
function Xl({ ground: e, runway: t, perf: n = Yl } = {}) {
	let r = {
		perf: n,
		runway: t,
		ground: e || (() => 0),
		ctl: {
			pitch: 0,
			roll: 0,
			yaw: 0,
			throttle: .3,
			ab: !1,
			brakes: !1
		},
		cfg: {
			gearDown: !0,
			flaps: "up",
			speedBrake: !1,
			hookDown: !1,
			canopyOpen: !1
		},
		s: null,
		events: [],
		reset(e = {}) {
			let n = e.runway || t, i = e.along ?? 120, [a, o] = n.point(i), s = e.heading ?? n.heading;
			return r.s = {
				lat: a,
				lon: o,
				h: n.height(i),
				heading: s,
				gamma: 0,
				V: 0,
				bank: 0,
				alpha: 0,
				theta: 0,
				n: 1,
				onGround: !0,
				crashed: !1,
				agl: 0,
				vs: 0,
				t: 0
			}, Object.assign(r.cfg, {
				gearDown: !0,
				flaps: "full",
				speedBrake: !1,
				hookDown: !1,
				canopyOpen: !1
			}), Object.assign(r.ctl, {
				pitch: 0,
				roll: 0,
				yaw: 0,
				throttle: .2,
				ab: !1,
				brakes: !0
			}), r;
		},
		place({ lat: e, lon: t, h: n, heading: i, V: a = 200, gamma: o = 0 }) {
			return r.s = {
				lat: e,
				lon: t,
				h: n,
				heading: i,
				gamma: o,
				V: a,
				bank: 0,
				alpha: 0,
				theta: 0,
				n: 1,
				onGround: !1,
				crashed: !1,
				agl: 100,
				vs: 0,
				t: 0
			}, Object.assign(r.cfg, {
				gearDown: !1,
				flaps: "up",
				speedBrake: !1,
				hookDown: !1,
				canopyOpen: !1
			}), Object.assign(r.ctl, {
				pitch: 0,
				roll: 0,
				yaw: 0,
				throttle: .75,
				ab: !1,
				brakes: !1
			}), r;
		},
		flapFactor() {
			return {
				up: 0,
				maneuver: .35,
				full: 1
			}[r.cfg.flaps] ?? 0;
		},
		vStall() {
			return n.vStallClean + (n.vStallFlaps - n.vStallClean) * r.flapFactor();
		},
		groundHeight(e = r.s.lat, t = r.s.lon) {
			let n = r.runway;
			if (n && n.contains(e, t)) return n.height(n.local(e, t).along);
			let i = r.ground(e, t);
			return Number.isFinite(i) ? i : n ? n.height(0) : 0;
		},
		stickToN(e) {
			let t = r.s, i = Math.cos(t.gamma) / Math.max(Math.cos(t.bank), .5);
			return e >= 0 ? i + e * (n.nMax - i) : i + -e * (n.nMin - i);
		},
		step(e) {
			let t = r.s;
			if (t.crashed) return;
			let i = r.ctl, a = r.cfg;
			t.t += e;
			let o = t.V / 340, s = r.flapFactor(), c = (1 + .4 * Hl(.85, 1.15, o)) * (1 + (a.gearDown ? .6 : 0) + .8 * s + +!!a.speedBrake + (a.hookDown ? .03 : 0)), l = n.thrustMil * Vl(i.throttle, 0, 1) + (i.ab ? n.thrustAB : 0), u = n.cd0 * c * t.V * t.V, d = r.vStall();
			if (t.onGround) {
				let a = i.brakes ? .45 : .025, o = Vl((t.V / d) ** 2 * (.15 + t.theta / (10 * $)), 0, 1.2), s = t.V > .05 ? a * zl * Math.max(0, 1 - o) : 0;
				t.V = Math.max(0, t.V + (l - u - s - 0) * e);
				let c = i.yaw * (t.V < 30 ? .35 * Math.min(1, t.V / 4) : .06 + 3 / Math.max(t.V, 1));
				t.heading = Ul(t.heading + c * e);
				let f = t.V > n.rotateSpeed * .9, p = f ? Vl(i.pitch, 0, 1) * 12 * $ : 0;
				t.theta = Wl(t.theta, p, (f ? 3.5 : 6) * $, e), t.bank = Wl(t.bank, 0, 20 * $, e), t.alpha = t.theta, t.gamma = 0, t.n = 1;
				let [m, h] = ql(t.lat, t.lon, t.heading, t.V * e);
				t.lat = m, t.lon = h, t.h = r.groundHeight(), t.agl = 0, t.vs = 0, o >= 1.02 && t.theta > 5 * $ && i.pitch > .2 && (t.onGround = !1, t.gamma = 1 * $, r.events.push({
					t: t.t,
					type: "liftoff",
					V: t.V
				}));
				return;
			}
			let f = n.rollRate * Vl(t.V / 120, .3, 1);
			Math.abs(i.roll) > .02 && (t.bank = Ul(t.bank + i.roll * f * e));
			let p = Math.min(n.nMax, (t.V / d) ** 2), m = Vl(r.stickToN(i.pitch), Math.max(n.nMin, -p), p);
			t.n = Wl(t.n, m, 12, e);
			let h = n.cdi * t.n * t.n / Math.max(t.V * t.V, 400);
			t.V = Math.max(20, t.V + (l - u - h - zl * Math.sin(t.gamma)) * e);
			let g = t.V;
			t.gamma = Vl(t.gamma + zl / g * (t.n * Math.cos(t.bank) - Math.cos(t.gamma)) * e, -89 * $, 89 * $), t.heading = Ul(t.heading + zl * t.n * Math.sin(t.bank) / (g * Math.max(Math.cos(t.gamma), .05)) * e), t.alpha = Vl(5.5 * $ * t.n * (100 / g) ** 2 * (1 - .25 * s), -6 * $, 18 * $), t.theta = t.gamma + t.alpha * Math.cos(t.bank);
			let _ = g * Math.cos(t.gamma) * e, [v, y] = ql(t.lat, t.lon, t.heading, _);
			t.lat = v, t.lon = y, t.vs = g * Math.sin(t.gamma), t.h += t.vs * e;
			let b = r.groundHeight();
			if (t.agl = t.h - b, t.agl <= 0) {
				let e = r.runway && r.runway.contains(t.lat, t.lon, 5), n = a.gearDown && t.vs > -7 && Math.abs(t.bank) < 15 * $ && t.theta > -2 * $ && t.theta < 16 * $;
				t.h = b, t.agl = 0, n && e ? (t.onGround = !0, t.gamma = 0, r.events.push({
					t: t.t,
					type: "touchdown",
					V: g,
					vs: t.vs
				})) : (t.crashed = !0, t.V = 0, r.events.push({
					t: t.t,
					type: "crash",
					V: g,
					vs: t.vs,
					onRunway: e,
					gear: a.gearDown
				}));
			}
		},
		axes() {
			let e = r.s, { heading: t, gamma: n, bank: i, alpha: a } = e, o = [
				Math.sin(t) * Math.cos(n),
				Math.cos(t) * Math.cos(n),
				Math.sin(n)
			], s = [
				Math.cos(t),
				-Math.sin(t),
				0
			], c = [
				s[1] * o[2] - s[2] * o[1],
				s[2] * o[0] - s[0] * o[2],
				s[0] * o[1] - s[1] * o[0]
			], l = s.map((e, t) => e * Math.cos(i) - c[t] * Math.sin(i)), u = c.map((e, t) => e * Math.cos(i) + s[t] * Math.sin(i)), d = e.onGround ? e.theta : a;
			return {
				f: o.map((e, t) => e * Math.cos(d) + u[t] * Math.sin(d)),
				r: l,
				u: u.map((e, t) => e * Math.cos(d) - o[t] * Math.sin(d))
			};
		}
	};
	return r;
}
function Zl(e, { route: t, landing: n, onPhase: r } = {}) {
	let i = {
		phase: "lineup",
		leg: 0,
		timer: 0,
		message: "",
		done: !1
	}, a = () => e.s, o = (e, t) => {
		i.phase = e, i.timer = 0, i.message = t || e, r && r(e, i.message);
	};
	o("lineup", "Lining up on runway 24R, Miramar");
	let s = (t) => {
		e.ctl.roll = Vl((t - a().bank) * 2.2, -1, 1);
	}, c = (t, n = 4) => {
		let r = a(), i = Math.cos(r.gamma) / Math.max(Math.cos(r.bank), .5), o = Vl(i + (t - r.gamma) * r.V / zl * 1.2, -1, n), s = e.perf.nMax, c = e.perf.nMin;
		e.ctl.pitch = o >= i ? (o - i) / (s - i) : -(o - i) / (c - i);
	}, l = (t, n = !0, r = !0) => {
		let i = t - a().V;
		e.ctl.throttle = Vl(.62 + i * .05, .08, 1), e.ctl.ab = n && i > 25, e.cfg.speedBrake = r && i < -25;
	}, u = (e, t = 12) => {
		let n = a();
		return Vl((e - n.h) * .02 * 120 / Math.max(n.V, 60), -t * $, t * $);
	}, d = (e, t = 60) => {
		let n = Ul(e - a().heading);
		s(Vl(n * 2.5, -t * $, t * $));
	}, f = (e, t, n = 60) => {
		let r = a(), i = Gl(r.lat, r.lon, e, t), o = Ul(i - r.heading), c = r.V * r.V / (zl * Math.tan(n * $));
		return Kl(r.lat, r.lon, e, t) < 2.3 * c * Math.abs(Math.sin(o)) && Math.abs(o) > 20 * $ ? s(0) : d(i, n), o;
	}, p = n.runway, m = n.touchdown ?? 300, h = (n.glideslope ?? 3) * $;
	return i.update = (r) => {
		let g = a(), _ = e.cfg, v = e.ctl;
		if (i.timer += r, !g.crashed) switch (!g.onGround && i.phase !== "final" && i.phase !== "flare" && (_.gearDown && g.agl > 15 && g.vs > 0 && (_.gearDown = !1), _.flaps !== "up" && g.V > 105 && g.agl > 120 && (_.flaps = "up")), i.phase) {
			case "lineup":
				v.brakes = !0, v.throttle = Math.min(1, .2 + i.timer * .4), v.ab = i.timer > 2.5, i.timer > 3.5 && o("takeoff", "Afterburner takeoff");
				break;
			case "takeoff": {
				v.brakes = !1, v.throttle = 1, v.ab = !0;
				let { cross: t } = n.departure.local(g.lat, g.lon);
				v.yaw = Vl(Ul(n.departure.heading - g.heading) * 3 - t * .02, -1, 1), v.pitch = g.V > e.perf.rotateSpeed ? .7 : 0, g.onGround || (v.yaw = 0, o("climb", "Gear up, climbing out"));
				break;
			}
			case "climb":
				s(0), c(g.agl < 60 ? 6 * $ : 10 * $), v.throttle = 1, v.ab = !0, g.agl > 250 && o("route", t[0].label || t[0].name);
				break;
			case "route": {
				let e = t[i.leg], n = e.lat * $, r = e.lon * $, a = Kl(g.lat, g.lon, n, r), s = f(n, r, e.maxBank ?? 70);
				c(u(e.alt, e.maxClimb ?? 15), 5);
				let d = Math.abs(s) > 35 * $;
				l(d ? Math.min(e.speed, 165) : e.speed, e.ab !== !1 && !d, e.sb !== !1), e.flaps && (_.flaps = e.flaps);
				let p = e.capture ?? Math.max(600, g.V * 4);
				(a < p || a < 2.5 * p && Math.abs(s) > 90 * $) && (i.leg++, i.leg >= t.length ? o("intercept", "Intercepting the runway 06L approach") : i.message = t[i.leg].label || t[i.leg].name);
				break;
			}
			case "intercept":
			case "final": {
				let { along: e, cross: t } = p.local(g.lat, g.lon), r = m - e, a = Vl(-t * .004, -.6, .6);
				if (i.onCourse) d(p.heading + a, i.phase === "final" ? 25 : 45);
				else {
					let [r, a] = p.point(-(n.ifDistance ?? 15e3) + m);
					f(r, a, 45);
					let o = Math.abs(Ul(p.heading - g.heading));
					(Kl(g.lat, g.lon, r, a) < 2500 || Math.abs(t) < 1500 && o < 60 * $ && e < 0) && (i.onCourse = !0);
				}
				let s = p.height(m) + r * Math.tan(h);
				if (i.phase === "intercept") c(u(Math.min(g.h, s + 0) - 0, 8)), l(r > 15e3 ? 140 : 100, !1, !0), r < 16e3 && (_.flaps = "maneuver"), r < 12e3 && Math.abs(t) < 400 && g.h >= s - 30 && (_.gearDown = !0, _.flaps = "full", _.hookDown = !0, o("final", "On final 06L: gear, flaps, hook down"));
				else {
					let e = -h + Vl((s - g.h) * .004, -3 * $, 3 * $);
					c(e, 2), l(n.vApp ?? 74, !1, !1), v.ab = !1, g.agl < 9 && o("flare", "Flare");
				}
				break;
			}
			case "flare": {
				let { cross: e } = p.local(g.lat, g.lon);
				d(p.heading - e * .004, 8), v.throttle = Math.max(0, v.throttle - r * .15), c(-Math.max(.6, Math.min(3, g.agl * .35)) * $, 1.6), g.onGround && o("rollout", "Touchdown! Braking");
				break;
			}
			case "rollout": {
				let { cross: e } = p.local(g.lat, g.lon);
				v.yaw = Vl(Ul(p.heading - g.heading) * 3 - e * .02, -1, 1), v.roll = 0, v.throttle = 0, v.ab = !1, _.speedBrake = !0, v.pitch = 0, v.brakes = i.timer > 1.5, g.V < .3 && (o("parked", "Stopped: canopy open, flaps up, wings to oversweep"), _.speedBrake = !1, _.hookDown = !1);
				break;
			}
			case "parked": v.brakes = !0, v.yaw = 0, _.flaps = "up", i.timer > 1 && (_.canopyOpen = !0), i.timer > 14 && (i.done = !0);
		}
	}, i;
}
var Ql = .3048, $l = -35.6;
function eu(e = $l) {
	let t = {
		lat06: 32.864566,
		lon06: -117.164848,
		h06: 425 * Ql + e,
		lat24: 32.872875,
		lon24: -117.127031,
		h24: 475 * Ql + e
	};
	return {
		r06: new Jl({
			name: "06L",
			lat0: t.lat06 * $,
			lon0: t.lon06 * $,
			h0: t.h06,
			lat1: t.lat24 * $,
			lon1: t.lon24 * $,
			h1: t.h24
		}),
		r24: new Jl({
			name: "24R",
			lat0: t.lat24 * $,
			lon0: t.lon24 * $,
			h0: t.h24,
			lat1: t.lat06 * $,
			lon1: t.lon06 * $,
			h1: t.h06
		})
	};
}
function tu(e = $l) {
	let t = (t, n, r, i, a, o = {}) => ({
		label: t,
		lat: n,
		lon: r,
		alt: i + e,
		speed: a,
		...o
	});
	return [
		t("Departing west over the coast", 32.835, -117.245, 900, 220),
		t("Pacific Beach and Mission Bay", 32.775, -117.262, 600, 230),
		t("Down the coast past Point Loma", 32.68, -117.263, 300, 200),
		t("Rounding Point Loma", 32.652, -117.253, 260, 170, {
			ab: !1,
			maxBank: 70,
			capture: 500
		}),
		t("Rounding Point Loma", 32.644, -117.236, 250, 170, {
			ab: !1,
			maxBank: 70,
			capture: 500
		}),
		t("Into San Diego Bay", 32.661, -117.223, 250, 300, { capture: 600 }),
		t("High-speed pass: North Island", 32.7, -117.192, 280, 330, { capture: 1e3 }),
		t("High-speed pass: downtown San Diego", 32.716, -117.158, 330, 330, { capture: 1500 }),
		t("Pulling up over Mission Valley", 32.752, -117.115, 1100, 250),
		t("Out over La Jolla", 32.858, -117.275, 1100, 200, { maxBank: 45 }),
		t("Offshore, turning back for Miramar", 32.88, -117.4, 900, 150, {
			maxBank: 40,
			ab: !1
		})
	];
}
// src/cesium/app.js
var nu = Math.PI / 180, ru = .3048, iu = .514444, au = (e, t, n) => Math.min(n, Math.max(t, e)), ou = [
	"chase",
	"cockpit",
	"flyby",
	"free"
], su = {
	chase: "Chase",
	cockpit: "Cockpit",
	flyby: "Fly-by",
	free: "Free"
}, cu = {
	fwd: 4.3,
	up: 3.28
}, lu = [
	["↑ ↓", "pitch (↑ = nose down)"],
	["← →", "roll"],
	["Q E", "rudder / nosewheel"],
	["W S", "throttle"],
	["A", "afterburner"],
	["Space", "wheel brakes"],
	["G F B H", "gear · flaps · speed brake · hook"],
	["M [ ]", "sweep mode · manual sweep"],
	["C", "canopy (on the ground)"],
	["V", "camera"],
	["P", "demo ↔ manual"],
	["T", "time ×1/×2/×4"],
	["R", "reset"]
];
function uu(e, t) {
	return Object.assign(e.style, t), e;
}
function du(e) {
	let t = uu(document.createElement("div"), {
		position: "absolute",
		inset: "0",
		pointerEvents: "none",
		zIndex: 5,
		font: "12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
		color: "#d8f5d8"
	}), n = uu(document.createElement("div"), {
		position: "absolute",
		top: "10px",
		left: "10px",
		padding: "10px 12px",
		minWidth: "230px",
		background: "rgba(8,14,10,0.62)",
		border: "1px solid rgba(140,255,160,0.25)",
		borderRadius: "8px",
		backdropFilter: "blur(3px)",
		whiteSpace: "pre"
	}), r = uu(document.createElement("div"), {
		position: "absolute",
		top: "12px",
		left: "50%",
		transform: "translateX(-50%)",
		padding: "6px 14px",
		background: "rgba(8,14,10,0.62)",
		border: "1px solid rgba(140,255,160,0.25)",
		borderRadius: "16px",
		font: "13px/1.3 system-ui, sans-serif",
		color: "#eaffea",
		whiteSpace: "nowrap"
	}), i = uu(document.createElement("div"), {
		position: "absolute",
		bottom: "34px",
		left: "10px",
		padding: "8px 10px",
		background: "rgba(8,14,10,0.55)",
		border: "1px solid rgba(140,255,160,0.2)",
		borderRadius: "8px",
		font: "11px/1.5 system-ui, sans-serif",
		color: "#cfe8cf"
	});
	return i.innerHTML = lu.map(([e, t]) => `<div><b style="display:inline-block;min-width:58px;color:#9f9">${e}</b>${t}</div>`).join("") + "<div style=\"margin-top:4px;opacity:.75\">Drag to orbit · scroll to zoom · <b>?</b> hides this help</div>", t.append(n, r, i), e.appendChild(t), {
		root: t,
		panel: n,
		banner: r,
		help: i
	};
}
async function fu(e, t, n = {}) {
	let { Cartesian3: r, Cartographic: i, Matrix3: a, Matrix4: o, Transforms: s, JulianDate: c, Model: l, Axis: u, ShadowMode: d, Math: f } = e, p = t.scene, m = p.globe, h = n.onStatus || (() => {});
	m.depthTestAgainstTerrain = !0, m.enableLighting = !0, n.shadows !== !1 && (t.shadows = !0, t.terrainShadows = d.RECEIVE_ONLY, p.shadowMap.softShadows = !0, p.shadowMap.maximumDistance = 2500), p.fog && (p.fog.density *= .6), t.clock.currentTime = c.fromIso8601(n.time || "2026-06-15T21:30:00Z"), t.clock.shouldAnimate = !0, t.clock.multiplier = 1, h("Sampling runway terrain…");
	let { r06: g, r24: _ } = eu(), v = $l;
	try {
		t.terrainProvider && t.terrainProvider.availability || await new Promise((e) => {
			let t = p.terrainProviderChanged.addEventListener(() => {
				t(), e();
			});
			setTimeout(e, 15e3);
		});
		let n = g.samplePoints(25).map(([e, t]) => i.fromRadians(t, e)), r = (await e.sampleTerrainMostDetailed(t.terrainProvider, n)).map((e) => e.height);
		r.every(Number.isFinite) && Math.max(...r) - Math.min(...r) < 60 && (Math.abs(r[0]) > 1 && (v = r[0] - 425 * ru), g.setProfile(r), _.setProfile(r.slice().reverse()));
	} catch (e) {
		console.warn("[F-14] terrain sampling failed, using published runway elevations", e);
	}
	h("Building F-14 model…");
	let { glb: y, jet: b, nodes: x } = await Rl({ livery: n.livery || "lowvis" }), S = URL.createObjectURL(new Blob([y], { type: "model/gltf-binary" })), C = await l.fromGltfAsync({
		url: S,
		forwardAxis: u.X,
		upAxis: u.Y,
		minimumPixelSize: 40,
		shadows: d.ENABLED
	});
	p.primitives.add(C), await new Promise((e, t) => {
		C.ready && e(), C.readyEvent.addEventListener(e), C.errorEvent.addEventListener(t);
	}), URL.revokeObjectURL(S);
	let w = [];
	for (let [e, t] of x) {
		let n = C.getNode(e);
		n && w.push({
			node: n,
			obj: t,
			m: (/* @__PURE__ */ new Float64Array(16)).fill(NaN),
			show: null
		});
	}
	let T = b.cockpit.crew.children[0], E = new o();
	function D(e) {
		b.root.updateMatrixWorld(!0);
		for (let t of w) {
			let n = t.obj.matrix.elements, r = !1;
			for (let e = 0; e < 16; e++) t.m[e] !== n[e] && (r = !0, t.m[e] = n[e]);
			r && (t.node.matrix = o.fromColumnMajorArray(n, E));
			let i = t.obj.visible && !(e && t.obj === T);
			i !== t.show && (t.node.show = i, t.show = i);
		}
	}
	let O = new i(), k = g.h0, A = Xl({
		ground: (e, t) => {
			O.longitude = t, O.latitude = e;
			let n = m.getHeight(O);
			return Number.isFinite(n) && (k = n), k;
		},
		runway: g
	}), ee = tu(v), j = null, M = n.mode === "manual" ? "manual" : "demo", N = "", te = 0, P = 0, F = 1, ne = (e, t = 4) => {
		N = e, te = performance.now() + t * 1e3;
	};
	function re() {
		A.reset({
			runway: _,
			along: 90
		}), b.state.sweepMode = "auto", b.state.canopyOpen = !1, P = 0, A.events.length = 0, M === "demo" ? j = Zl(A, {
			route: ee,
			landing: {
				runway: g,
				departure: _,
				vApp: 74,
				touchdown: 300
			},
			onPhase: (e, t) => ne(t, 6)
		}) : (j = null, A.cfg.flaps = "full", A.ctl.throttle = .25, ne("Manual: runway 24R, flaps full. W for power, A for afterburner, ↓ to rotate at ~140 kt", 8)), b.update(0, !0);
	}
	function ie(e) {
		M = e, e === "demo" ? re() : (j = null, A.ctl.pitch = A.ctl.roll = A.ctl.yaw = 0, ne("You have control", 3));
	}
	re();
	let ae = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Set([
		"arrowup",
		"arrowdown",
		"arrowleft",
		"arrowright",
		"q",
		"e",
		"w",
		"s"
	]);
	function se(e) {
		if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
		let t = e.key.toLowerCase();
		if ((t.startsWith("arrow") || t === " ") && e.preventDefault(), ae.has(t)) return;
		ae.add(t);
		let n = A.cfg, r = A.s;
		switch (M === "demo" && (oe.has(t) || "agfbh".includes(t)) && ie("manual"), t) {
			case "a":
				A.ctl.ab = !A.ctl.ab, A.ctl.ab && (A.ctl.throttle = 1);
				break;
			case "g":
				n.gearDown && r.onGround ? ne("Weight on wheels: gear stays down") : n.gearDown = !n.gearDown;
				break;
			case "f":
				n.flaps = {
					up: "maneuver",
					maneuver: "full",
					full: "up"
				}[n.flaps];
				break;
			case "b":
				n.speedBrake = !n.speedBrake;
				break;
			case "h":
				n.hookDown = !n.hookDown;
				break;
			case "c":
				r.onGround && r.V < 5 ? n.canopyOpen = !n.canopyOpen : ne("Canopy only on the ground, stopped");
				break;
			case "m": {
				let e = [
					"auto",
					"manual",
					"bomb",
					"oversweep"
				];
				b.state.sweepMode = e[(e.indexOf(b.state.sweepMode) + 1) % e.length], b.state.sweepMode === "manual" && (b.state.manualSweep = Math.round(b.pos.sweep)), ne(`Sweep mode: ${b.state.sweepMode}`, 2);
				break;
			}
			case "[":
			case "]":
				b.state.sweepMode = "manual", b.state.manualSweep = au(b.state.manualSweep + (t === "]" ? 5 : -5), 20, 68);
				break;
			case "v":
				ge(ou[(ou.indexOf(fe) + 1) % ou.length]);
				break;
			case "p":
				ie(M === "demo" ? "manual" : "demo");
				break;
			case "t":
				F = F === 1 ? 2 : F === 2 ? 4 : 1, ne(`Time ×${F}`, 2);
				break;
			case "r":
				re();
				break;
			case "?": I.help.style.display = I.help.style.display === "none" ? "" : "none";
		}
	}
	let ce = (e) => ae.delete(e.key.toLowerCase()), le = () => ae.clear();
	window.addEventListener("keydown", se), window.addEventListener("keyup", ce), window.addEventListener("blur", le);
	function ue(e) {
		let t = A.ctl, n = (e, t) => +!!ae.has(t) - !!ae.has(e), r = (t, n, r) => t + au(n - t, -r * e, r * e);
		t.pitch = r(t.pitch, n("arrowup", "arrowdown") * .75, 3), t.roll = r(t.roll, n("arrowleft", "arrowright"), 4), t.yaw = r(t.yaw, n("q", "e"), 3), t.throttle = au(t.throttle + n("s", "w") * .5 * e, 0, 1), ae.has("s") && t.ab && (t.ab = !1), t.brakes = ae.has(" ");
	}
	let de = p.camera, fe = ou.includes(n.camera) ? n.camera : "chase", pe = null, me = null, he = A.s.heading;
	function ge(e) {
		fe = e, de.lookAtTransform(o.IDENTITY), de.frustum.near = e === "cockpit" ? .2 : 1, pe = null, me = null, ne(`Camera: ${su[e]}`, 2);
	}
	ge(fe);
	let _e = new o(), ve = new a(), ye = new o(), be = new o(), xe = new r(), Se = (e, t, n) => new r(e, t, n), Ce = (e, t, n) => o.multiplyByPointAsVector(e, Se(t[0], t[1], t[2]), n || new r()), I = du(t.container), we = performance.now(), L = 0;
	function Te() {
		let e = performance.now(), t = Math.min(.1, (e - we) / 1e3);
		we = e;
		let n = t * F;
		M === "manual" && ue(t);
		let i = Math.max(1, Math.ceil(n / (1 / 120)));
		for (let e = 0; e < i; e++) j && j.update(n / i), A.step(n / i);
		let c = A.s;
		c.crashed && (P || ne(M === "demo" ? "Crashed! Restarting…" : "Crashed! Press R to reset", 5), P += t, M === "demo" && P > 3 && re()), j && j.done && re();
		let l = b.state, u = A.cfg;
		l.mach = c.V / 340, l.flaps = u.flaps, l.gearDown = u.gearDown, l.speedBrake = u.speedBrake, l.hookDown = u.hookDown, l.canopyOpen = u.canopyOpen, l.throttle = Math.max(.12, A.ctl.throttle), l.afterburner = +!!A.ctl.ab, l.pitch = au(A.ctl.pitch, -1, 1) * .8, l.roll = au(A.ctl.roll, -1, 1) * .6, l.yaw = au(A.ctl.yaw, -1, 1) * .6, j && j.phase === "parked" && j.timer > 5 && (l.sweepMode = "oversweep"), b.update(n), D(fe === "cockpit"), r.fromRadians(c.lon, c.lat, c.h, void 0, xe), s.eastNorthUpToFixedFrame(xe, void 0, _e);
		let { f: d, r: f, u: p } = A.axes();
		a.fromColumnMajorArray([
			d[0],
			d[1],
			d[2],
			-f[0],
			-f[1],
			-f[2],
			p[0],
			p[1],
			p[2]
		], ve), o.fromRotationTranslation(ve, r.ZERO, ye), o.multiply(_e, ye, be), C.modelMatrix = be, Ee(t, c, d, p), L -= t, L <= 0 && (L = .1, De(c));
	}
	function Ee(e, t, n, c) {
		let l = r.add(xe, Ce(_e, c.map((e) => e * 2.3)), new r());
		if (fe === "chase") {
			let n = 1 - Math.exp(-e * 3);
			he += Math.atan2(Math.sin(t.heading - he), Math.cos(t.heading - he)) * n;
			let i = Math.cos(he), c = Math.sin(he), u = s.eastNorthUpToFixedFrame(l), d = o.fromRotationTranslation(a.fromColumnMajorArray([
				i,
				-c,
				0,
				c,
				i,
				0,
				0,
				0,
				1
			])), f = o.multiply(u, d, new o());
			pe ? r.clone(de.position, pe) : pe = new r(0, -42, 10), de.lookAtTransform(f, pe);
		} else if (fe === "cockpit") {
			let e = r.add(xe, Ce(_e, n.map((e, t) => e * cu.fwd + c[t] * cu.up)), new r()), t = Ce(_e, n), i = Ce(_e, c), a = r.normalize(r.subtract(t, r.multiplyByScalar(i, .12, new r()), new r()), new r());
			de.setView({
				destination: e,
				orientation: {
					direction: a,
					up: i
				}
			});
		} else if (fe === "flyby") {
			let e = Ce(_e, [
				Math.sin(t.heading),
				Math.cos(t.heading),
				0
			]), n = Ce(_e, [
				Math.cos(t.heading),
				-Math.sin(t.heading),
				0
			]), a = me ? r.subtract(me, l, new r()) : null, o = a ? r.magnitude(a) : Infinity, s = !a || r.dot(a, e) < 0;
			if (!me || s && o > Math.max(250, t.V * 3) || o > 6e3) {
				let a = au(t.V * 5, 60, 1500);
				me = r.add(l, r.multiplyByScalar(e, a, new r()), new r()), r.add(me, r.multiplyByScalar(n, au(t.V * .3, 25, 90), new r()), me);
				let o = i.fromCartesian(me), s = m.getHeight(o);
				o.height = Math.max(o.height - 6, (Number.isFinite(s) ? s : t.h) + 4), me = i.toCartesian(o);
			}
			let c = r.normalize(r.subtract(l, me, new r()), new r()), u = p.globe.ellipsoid.geodeticSurfaceNormal(me, new r()), d = r.normalize(r.cross(c, u, new r()), new r()), f = r.cross(d, c, new r());
			de.setView({
				destination: me,
				orientation: {
					direction: c,
					up: f
				}
			});
		}
	}
	function De(e) {
		let t = A.cfg, n = b.pos, r = (e.heading / nu + 360) % 360, i = (e.h - v) / ru, a = n.gear > .99 ? "DOWN" : n.gear < .01 ? "UP" : "TRANSIT", o = [
			`F-14A TOMCAT    ${M === "demo" ? "DEMO" : "MANUAL"}  ${su[fe]}${F > 1 ? `  ×${F}` : ""}`,
			`IAS  ${(e.V / iu).toFixed(0).padStart(4)} kt   M ${(e.V / 340).toFixed(2)}`,
			`ALT  ${i.toFixed(0).padStart(5)} ft   AGL ${(e.agl / ru).toFixed(0)} ft`,
			`HDG  ${r.toFixed(0).padStart(3, "0")}°      VS ${(e.vs / ru * 60).toFixed(0)} fpm`,
			`G    ${e.n.toFixed(1).padStart(4)}       BANK ${(e.bank / nu).toFixed(0)}°`,
			`THR  ${(A.ctl.throttle * 100).toFixed(0).padStart(3)}%${A.ctl.ab ? "  AFTERBURNER" : ""}`,
			`WING ${n.sweep.toFixed(0).padStart(3)}°  (${b.state.sweepMode})`,
			`GEAR ${a}  FLAPS ${t.flaps.toUpperCase()}`,
			`SB ${t.speedBrake ? "OUT" : "IN"}  HOOK ${t.hookDown ? "DN" : "UP"}${A.ctl.brakes && e.onGround ? "  BRAKES" : ""}`
		];
		I.panel.textContent = o.join("\n");
		let s = performance.now() < te || e.crashed;
		I.banner.style.display = s ? "" : "none", I.banner.textContent = N;
	}
	let Oe = p.preUpdate.addEventListener(Te);
	return h(""), ne(M === "demo" ? "Demo flight: NAS Miramar → San Diego. Press P to fly it yourself" : N, 6), {
		sim: A,
		jet: b,
		model: C,
		get pilot() {
			return j;
		},
		get mode() {
			return M;
		},
		setMode: ie,
		setCamera: ge,
		reset: re,
		setTimeScale: (e) => F = e,
		destroy() {
			Oe(), window.removeEventListener("keydown", se), window.removeEventListener("keyup", ce), window.removeEventListener("blur", le), p.primitives.remove(C), I.root.remove(), I = null;
		}
	};
}
export { fu as startF14Flight };
