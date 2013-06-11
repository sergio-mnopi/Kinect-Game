// Droid.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012

	// private data
private var lineRenderer: LineRenderer;
private var collideDetect: int=0;
private var rotateDir: float=1.0f;
  
	//------------------------------------------------------------
	// Use this for initialization
function Start () {
	// init some linerenderer parameters
	lineRenderer = gameObject.AddComponent(LineRenderer);
	lineRenderer.SetWidth(0.05f, 0.05f);
}
	
	//------------------------------------------------------------
	// Update is called once per frame
function Update () {
		
	// change of direction if a collision detected
	if(collideDetect!=0) {
		if(collideDetect<12) {
			transform.Translate(0,0,-0.05f);
			collideDetect+=1;
			if(Random.value>0.5f)
				rotateDir=1.0f;
			else
				rotateDir=-1.0f;
		}
		else {
			transform.Rotate(0,rotateDir,0);
			collideDetect+=1;
			if(collideDetect>80) collideDetect=0;				
		}
			
	}
	else{
	// move cube
		transform.Translate(0,0,0.05f);
	}
		
		
	// set LineRenderer position and detection
	lineRenderer.SetPosition(0, transform.position);
	var dir: Vector3 = transform.TransformDirection(Vector3.forward);
	lineRenderer.SetPosition(1, transform.position+dir*1.5f);			
		
		
	// RayCast obstacle detect
	var hit: RaycastHit;
	if (Physics.Raycast(transform.position, dir, hit)) 
	{
		if(hit.collider.gameObject.name.Contains("Cube") && (hit.distance<1.5f))	
		{
			collideDetect=1;
		}
	}
}
