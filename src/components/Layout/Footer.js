import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <p className="title">What We Do</p>
                    <p>"Help you find the best place around."</p>
                    <ul>
                        <li>
                            <p><i className="fa fa-map-o fa-2x"></i></p>
                            <p>Los Angeles, CA</p>
                        </li>
                        <li>
                            <p><i className="fa fa-envelope-o fa-2x"></i></p>
                            <p>zqian0308@gmail.com</p>
                        </li>
                        <li>
                            <p><i className="fa fa-phone fa-2x"></i></p>
                            <p>+1 321 000 0000</p>
                        </li>
                    </ul>
                </footer>

            </div>
        );
    }
}

export default Footer;