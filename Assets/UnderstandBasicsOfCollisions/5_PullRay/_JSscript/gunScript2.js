// gunScript2.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

// the gun for fire
public var gun: GameObject;

// private data
private var lineRenderer: LineRenderer;

	//------------------------------------------------------------
	// Use this for initialization
function Start () {
	// init some linerenderer parameters
	lineRenderer = gameObject.AddComponent(LineRenderer);
	lineRenderer.SetWidth(0.1f, 0.1f);
}

	//------------------------------------------------------------
	// Update is called once per frame
	// control of gun
function Update () {
		// control of gun, just little rotatation left/right
		if( Input.GetKey(KeyCode.LeftArrow)) transform.Rotate(0,-0.5f,0);
		if( Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0,0.5f,0);
		if( Input.GetKey(KeyCode.UpArrow)) transform.Rotate(-0.5f,0,0);
		if( Input.GetKey(KeyCode.DownArrow)) transform.Rotate(0.5f,0,0);

		// set LineRenderer position
		if( Input.GetKey("space") ) {
			lineRenderer.SetPosition(0, gun.transform.position);
			var dir: Vector3 = gun.transform.TransformDirection(Vector3.forward);
			lineRenderer.SetPosition(1, gun.transform.position+dir*4.0f);			
		}
		
		// firing of the projectile
		if( Input.GetKeyUp("space") ) {
			
			dir = gun.transform.TransformDirection(Vector3.forward);
			var hit:RaycastHit;
			if (Physics.Raycast(transform.position, dir, hit)) {
				if(hit.collider.gameObject.tag == "Ennemi")
				{
					Destroy(hit.collider.gameObject);
					var obj: GameObject = GameObject.Find("score");
					obj.SendMessage("ApplyPoints", 1);
				}
			}
			// linerenderer out
			lineRenderer.SetPosition(0, Vector3.up*100);
			lineRenderer.SetPosition(1, Vector3.up*100);			
		}
}