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