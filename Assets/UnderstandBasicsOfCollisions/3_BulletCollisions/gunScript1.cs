// gunScript1.cs
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

public class gunScript1 : MonoBehaviour {

	// the gun for fire
	public GameObject gun;
	
	// private data
	private GameObject bullet=null;
	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
		bullet = GameObject.Find("bullet");
	}
	
	//------------------------------------------------------------
	// Update is called once per frame
	// control of gun
	void Update () {
		// control of gun, just little rotatation left/right
		if( Input.GetKey(KeyCode.LeftArrow)) transform.Rotate(0,-0.5f,0);
		if( Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0,0.5f,0);
		if( Input.GetKey(KeyCode.UpArrow)) transform.Rotate(-0.5f,0,0);
		if( Input.GetKey(KeyCode.DownArrow)) transform.Rotate(0.5f,0,0);

		
		// firing of the projectile
		if( Input.GetKeyUp("space") ) {
			GameObject obj = Instantiate(bullet, gun.transform.position, gun.transform.rotation) as GameObject;
			obj.AddComponent<bulletScript1>();
			obj.name = "BulletClone";
		}
	}
}
