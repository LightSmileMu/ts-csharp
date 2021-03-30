import * as assert from "assert";

import {
  convertInterfacesToCSharp,
  extractInterfaceName,
  extractProperties,
} from "../index";

suite("Interface conversion tests", () => {
  test("generate classes - multiple interfaces", () => {
    let input = `
        interface Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        interface SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let expected = `
        public class Beans {            
            public string PropOne {get;set;}
            
            public string PropTwo {get;set;}
            
            public int PropThree {get;set;}
            
            public bool PropFour {get;set;}
        }

        public class SecondaryClass {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate classes - prefix and suffix", () => {
    let input = `
        interface Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        interface SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let expected = `
        public class PrefixBeansSuffix {            
            public string PropOne {get;set;}
            
            public string PropTwo {get;set;}
            
            public int PropThree {get;set;}
            
            public bool PropFour {get;set;}
        }

        public class PrefixSecondaryClassSuffix {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input, false, "Prefix", "Suffix")
      .replace(/\s+/g, " ")
      .trim();

    assert.deepEqual(actual, expected);
  });

  test("generate classes (exports only) - multiple interfaces", () => {
    let input = `
        interface Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        export interface SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let expected = `
        public class SecondaryClass {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input, true)
      .replace(/\s+/g, " ")
      .trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - primative types", () => {
    let input = `
        interface Beans {
            propOne? : string;
            propTwo : string;
            propThree : number;
            propFour : boolean;
        }
        `.replace(/\s+/g, " ");

    let expected = `
        public class Beans {            
            public string PropOne {get;set;}
            
            public string PropTwo {get;set;}
            
            public int PropThree {get;set;}
            
            public bool PropFour {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - primative lists", () => {
    let input = `
        interface Beans {
            propOne : string[];
            propTwo : boolean[];
            propThree : number[];
            propFour? : any[];
        }
        `.replace(/\s+/g, " ");

    let expected = `
        public class Beans {            
            public IEnumerable<string> PropOne {get;set;}

            public IEnumerable<bool> PropTwo {get;set;}
            
            public IEnumerable<int> PropThree {get;set;}
            
            public IEnumerable<object> PropFour {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - custom object", () => {
    let input = `
        interface Beans {
            propOne : CustomClass;
        }
        `.replace(/\s+/g, " ");

    let expected = `
        public class Beans {            
            public CustomClass PropOne {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - custom object list", () => {
    let input = `
        interface Beans {
            propOne : CustomClass[];
        }
        `.replace(/\s+/g, " ");

    let expected = `
        public class Beans {            
            public IEnumerable<CustomClass> PropOne {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - empty interface", () => {
    let input = `
        interface Beans {
        }
        `.replace(/\s+/g, " ");

    let expected = `
        public class Beans {
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    let actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("extract name", () => {
    let input = `
        interface Beans {
        }
        `.replace(/\s+/g, " ");

    let expected = "Beans";

    let actual = extractInterfaceName(input);

    assert.deepEqual(actual, expected);
  });

  test("extract property - primative", () => {
    let input = `
        interface Beans {
            propertyOne : string;
        }
        `.replace(/\s+/g, " ");

    let expected = [{ property: "propertyOne", type: "string" }];

    let actual = extractProperties(input);

    assert.deepEqual(actual, expected);
  });

  test("extract property - list", () => {
    let input = `
        interface Beans {
            propertyOne : string[];
        }
        `.replace(/\s+/g, " ");

    let expected = [{ property: "propertyOne", type: "string[]" }];

    let actual = extractProperties(input);

    assert.deepEqual(actual, expected);
  });
});

suite("Class conversion tests", () => {
  test("generate classes - multiple interfaces", () => {
    const input = `
        class Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        class SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const expected = `
        public class Beans {            
            public string PropOne {get;set;}
            
            public string PropTwo {get;set;}
            
            public int PropThree {get;set;}
            
            public bool PropFour {get;set;}
        }

        public class SecondaryClass {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate classes - prefix and suffix", () => {
    const input = `
        class Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        class SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const expected = `
        public class PrefixBeansSuffix {            
            public string PropOne {get;set;}
            
            public string PropTwo {get;set;}
            
            public int PropThree {get;set;}
            
            public bool PropFour {get;set;}
        }

        public class PrefixSecondaryClassSuffix {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input, false, "Prefix", "Suffix")
      .replace(/\s+/g, " ")
      .trim();

    assert.deepEqual(actual, expected);
  });

  test("generate classes (exports only) - multiple interfaces", () => {
    const input = `
        class Beans {
            propOne : string;
            propTwo? : string;
            propThree : number;
            propFour : boolean;
        }

        export class SecondaryClass {
            propertyNumberOne : number[];
            isProperty : boolean;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const expected = `
        public class SecondaryClass {            
            public IEnumerable<int> PropertyNumberOne {get;set;}
            
            public bool IsProperty {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input, true)
      .replace(/\s+/g, " ")
      .trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - primative types", () => {
    const input = `
        class Beans {
            propOne? : string;
            propTwo : string;
            propThree : number;
            propFour : boolean;
        }
        `.replace(/\s+/g, " ");

    const expected = `
        public class Beans {
            
            public string PropOne;

            
            public string PropTwo;

            
            public int PropThree;

            
            public bool PropFour;
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - primative lists", () => {
    const input = `
        class Beans {
            propOne : string[];
            propTwo : boolean[];
            propThree : number[];
            propFour? : any[];
        }
        `.replace(/\s+/g, " ");

    const expected = `
        public class Beans {
            
            public IEnumerable<string> PropOne {get;set;}

            
            public IEnumerable<bool> PropTwo {get;set;}

            
            public IEnumerable<int> PropThree {get;set;}

            
            public IEnumerable<object> PropFour {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - custom object", () => {
    const input = `
        class Beans {
            propOne : CustomClass;
        }
        `.replace(/\s+/g, " ");

    const expected = `
        public class Beans {            
            public CustomClass PropOne {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - custom object list", () => {
    const input = `
        class Beans {
            propOne : CustomClass[];
        }
        `.replace(/\s+/g, " ");

    const expected = `
        public class Beans {            
            public IEnumerable<CustomClass> PropOne {get;set;}
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("generate class - empty interface", () => {
    const input = `
        class Beans {
        }
        `.replace(/\s+/g, " ");

    const expected = `
        public class Beans {
        }
        `
      .replace(/\s+/g, " ")
      .trim();

    const actual = convertInterfacesToCSharp(input).replace(/\s+/g, " ").trim();

    assert.deepEqual(actual, expected);
  });

  test("extract name", () => {
    const input = `
        class Beans {
        }
        `.replace(/\s+/g, " ");

    const expected = "Beans";

    const actual = extractInterfaceName(input);

    assert.deepEqual(actual, expected);
  });

  test("extract property - primative", () => {
    const input = `
        class Beans {
            propertyOne : string;
        }
        `.replace(/\s+/g, " ");

    const expected = [{ property: "propertyOne", type: "string" }];

    const actual = extractProperties(input);

    assert.deepEqual(actual, expected);
  });

  test("extract property - list", () => {
    const input = `
        class Beans {
            propertyOne : string[];
        }
        `.replace(/\s+/g, " ");

    const expected = [{ property: "propertyOne", type: "string[]" }];

    const actual = extractProperties(input);

    assert.deepEqual(actual, expected);
  });
});
