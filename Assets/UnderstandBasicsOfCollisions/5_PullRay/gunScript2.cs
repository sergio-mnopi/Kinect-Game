// gunScript2.cs
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

public class gunScript2 : MonoBehaviour {

	// the gun for fire
	public GameObject gun;

	// private data
	private LineRenderer lineRenderer;
	
	//------------------------------------------------------------
	// Use this for initialization
	void Start () {
		// init some linerenderer parameters
		lineRenderer = gameObject.AddComponent<LineRenderer>();
		lineRenderer.SetWidth(0.1f, 0.1f);
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

		// set LineRenderer position
		if( Input.GetKey("space") ) {
			lineRenderer.SetPosition(0, gun.transform.position);
			Vector3 dir = gun.transform.TransformDirection(Vector3.forward);
			lineRenderer.SetPosition(1, gun.transform.position+dir*4.0f);			
		}
		
		// firing of the projectile
		if( Input.GetKeyUp("space") ) {
			
			Vector3 dir = gun.transform.TransformDirection(Vector3.forward);
			RaycastHit hit;
			if (Physics.Raycast(transform.position, dir, out hit)) {
				if(hit.collider.gameObject.tag == "Ennemi")
				{
					Destroy(hit.collider.gameObject);
					GameObject obj = GameObject.Find("score");
					obj.SendMessage("ApplyPoints", 1);
				}
			}
			// linerenderer out
			lineRenderer.SetPosition(0, Vector3.up*100);
			lineRenderer.SetPosition(1, Vector3.up*100);			
		}
	}

}
