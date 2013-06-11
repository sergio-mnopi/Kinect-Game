// planeScript1.js
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 

function Update () {
}

	//------------------------------------------------------------
	// CollisionEnter callback
function OnCollisionEnter(other:Collision)
{	
		if(other.gameObject.name == "BulletClone")
		{	// if our bullet touches the surface plane, we kill it
			Destroy(other.gameObject);
		}
}
