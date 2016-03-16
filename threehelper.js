function doDispose(obj)
{
    if (obj !== null)
    {
        for (var i = 0; i < obj.children.length; i++)
        {
            doDispose(obj.children[i]);
        }
        if (obj.geometry)
        {
            obj.geometry.dispose();
            obj.geometry = undefined;
        }
        if (obj.material)
        {
            if (obj.material.materials)
            {
                for (i = 0; i < obj.material.materials.length; i++)
                {
                    obj.material.materials[i].dispose();
                }
            }
            else
            {
                obj.material.dispose();
            }
            obj.material = undefined;
        }
        if (obj.texture)
        {
            obj.texture.dispose();
            obj.texture = undefined;
        }
    }
    obj = undefined;
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}