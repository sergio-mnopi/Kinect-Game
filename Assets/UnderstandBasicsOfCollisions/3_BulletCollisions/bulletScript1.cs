// bulletScript1.cs
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

public class bulletScript1 : MonoBehaviour {

	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
	
	}
	
	//------------------------------------------------------------
	// Update is called once per frame
	// bullet move
	void Update () {
		rigidbody.transform.Translate(0,0,0.1f);
		
		//test if bullet is out of range
		if( Vector3.Distance(rigidbody.transform.position, new Vector3(0,0,0))>10.0f) {
						Destroy(this.gameObject);
		}
	}

	//------------------------------------------------------------
	// CollisionEnter callback, test enter collision state
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
		// ->>> OR by name	<<<-
		//	if(other.gameObject.name.Contains("Cube"))	
		{
			Destroy(other.gameObject);
			Destroy(this.gameObject);
			GameObject obj = GameObject.Find("score");
			obj.SendMessage("ApplyPoints", 1);
		}
	}
}
