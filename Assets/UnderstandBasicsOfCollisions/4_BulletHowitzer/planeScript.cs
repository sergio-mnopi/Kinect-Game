// planeScript.cs
//
// Created by: Jimmy.M
// Company: Canopus 3D-creation (http://www.canopus3Dcreation.com)
//
// Version: 1.01
//
// Copyright © Canopus 3D-creation  2012 
// 

using UnityEngine;
using System.Collections;

public class planeScript : MonoBehaviour {

	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}

	
	//------------------------------------------------------------
	// CollisionEnter callback
	void OnCollisionEnter(Collision other)
	{	
		if(other.gameObject.name == "BulletClone")
		{	// if our bullet touches the surface plane, we kill it
			Destroy(other.gameObject);
		}
	}

}
