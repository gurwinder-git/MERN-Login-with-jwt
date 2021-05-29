import React from 'react';
import '../css/about.css';

function About() {
    return (<>
        <h2 id="heading">About Your</h2>
        <div id="aboutDiv">
            <div className="cols">
                <img src="https://picsum.photos/200/300" alt="avatar"/>
            </div>

            <div className="cols">
                <div id="bioDiv">
                    <h3>Gurwinder Singh</h3>
                    <small>web Developer</small>
                </div>
                <div id="otherDetailesDiv">
                    <div className="row">
                        <div>
                            userId:
                        </div>
                        <div>
                            394234090230949080
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            email:
                        </div>
                        <div>
                            394234090230949080
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            email:
                        </div>
                        <div>
                            394234090230949080
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default About
