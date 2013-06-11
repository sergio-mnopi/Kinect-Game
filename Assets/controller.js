#pragma strict

function Start () {

}

    var speed : float = 5;
    var x : float;
    var z : float;
     
    function Update () {
    x = Input.GetAxis("Horizontal") * speed * Time.deltaTime;
    z = Input.GetAxis("Vertical") * speed * Time.deltaTime;
    transform.Translate(x, 0, z);
    }