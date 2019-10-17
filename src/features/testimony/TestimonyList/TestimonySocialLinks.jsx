import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook,faTwitter,faGithub } from "@fortawesome/free-brands-svg-icons";

class TestimonySocialLinks extends Component {
    render() {
        const { facebook, twitter, git } = this.props;
        return (
            <List.Item>
                <div className="social-container">
                    <a href={facebook} target="_blank" className="facebook social">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href={twitter} target="_blank" className="twitter social">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href={git} target="_blank" className="github social">
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                </div>
            </List.Item>
        )
    }
}
export default TestimonySocialLinks;