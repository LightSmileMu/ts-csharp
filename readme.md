# ts2csharp-auto

Convert typescript interfaces or classes to csharp classes.

## Example usage

```javascript
import { convertInterfacesToCSharp } from "ts2csharp-auto";

const myTypescriptClassString = `
interface MyTypescriptClass {
    propOne : any;
    propTwo : string;
    propThree : number[];
    propFour : boolean;
}

interface AnotherTypescriptClass {
    nestedObjectsInAList : MyTypescriptClass[];
    recursiveObject : AnotherTypescriptClass;
    isReallyCool : boolean;
}
`;

const myCsharpClass = convertInterfacesToCSharp(myTypescriptClassString);

console.log(myCsharpClass);
```

Generates the following code:

```c#

public class MyTypescriptClass {
    
    public object PropOne {get;set;}
    
    public string PropTwo {get;set;}
    
    public IEnumerable<int> PropThree {get;set;}
    
    public bool PropFour {get;set;}

}

public class AnotherTypescriptClass {

    public IEnumerable<MyTypescriptClass> NestedObjectsInAList {get;set;}

    public AnotherTypescriptClass RecursiveObject {get;set;}

    public bool IsReallyCool {get;set;}

}
```
