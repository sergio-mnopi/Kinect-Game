// bulletScript1.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 
// 

	//------------------------------------------------------------
	// Update is called once per frame
	// bullet move
function Update () {
	rigidbody.transform.Translate(0,0,0.1f);
		
	//test if bullet is out of range
	if( Vector3.Distance(rigidbody.transform.position, Vector3(0,0,0))>10.0f) {
					Destroy(this.gameObject);
	}
}
	//------------------------------------------------------------
	// CollisionEnter callback, test enter collision state
function OnCollisionEnter(other: Collision)
{	
		// see if a cube is touched by our bullet.
		// if our bullet hit one of the cubes, 
		// it is destroyed and the bullet itself.
		// 
		// it will detect the object touched either by name or by its tag
		// 
		// by tag:
		if(other.gameObject.tag == "Ennemi")	
		//
		// ->>> OR by name	<<<-
		//	if(other.gameObject.name.Contains("Cube"))	
		{
			Destroy(other.gameObject);
			Destroy(this.gameObject);
			var obj: GameObject = GameObject.Find("score");
			obj.SendMessage("ApplyPoints", 1);
		}
}
		
