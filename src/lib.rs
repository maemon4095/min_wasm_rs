use wasm_bindgen::prelude::*;

#[derive(Debug)]
struct A {
    x: usize,
    y: usize,
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    let a = A { x: 1, y: 2 };
}
