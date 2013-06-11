// bulletScrip.cs
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

public class bulletScript : MonoBehaviour {


	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}
	
	//------------------------------------------------------------
	// CollisionEnter callback
	void OnCollisionEnter(Collision other)
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
		// or by name	
		//	if(other.gameObject.name.Contains("Cube"))	
		{
			Destroy(other.gameObject);
			Destroy(this.gameObject);
			GameObject obj = GameObject.Find("score");
			obj.SendMessage("ApplyPoints", 1);
		}
	}
}


