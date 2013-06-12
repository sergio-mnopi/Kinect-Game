#pragma strict

function Start () {

}

    var speed : float = 5;
    var y:float;
    function Update () {
    y = speed * Time.deltaTime;
    transform.Translate(0, y, 0);
    }