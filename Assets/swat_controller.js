#pragma strict

function Start () {

}

    var speed : float = 5;
    var z:float;
    function Update () {
    z = speed * Time.deltaTime;
    transform.Translate(0, 0, z);
    }