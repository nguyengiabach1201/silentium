import { LuaFactory } from "wasmoon";

const factory = new LuaFactory();
const lua = await factory.createEngine();

try {
    // lua.global.remove("require");
    lua.global.set("sum", (x, y) => x + y);
    await lua.doString(`
    print(sum(10, 10))
    function multiply(x, y)
        return x * y
    end
    `);

    const multiply = lua.global.get("multiply");
    console.log(lua.global.get("init"));
    console.log(multiply(10, 10));
} finally {
    lua.global.close();
}
