#pragma strict

function Start () {

}

    var speed : float = 5;
    var x : float;
    var z : float;
     
    function Update () {
    x = Input.GetAxis("Horizontal") * speed;
    z = Input.GetAxis("Vertical") * speed * Time.deltaTime;
	transform.Rotate(0,x,0);
    transform.Translate(0, 0, z);
    }