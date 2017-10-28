import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	constructor() {
		super();

		this.state.show = false;

		this.menuClick = this.menuClick.bind(this);
	}

	menuClick() {
		console.log('menuClick');

		this.setState({
			show: this.state.show ? false : true
		});
	}

	render({}, {show}) {
		return (
			<header class={style.header + ' tc relative'} onclick={this.menuClick}>
				<h1 class={style.headerLogo}></h1>
				<button class={style.menuIcon + ' absolute top-0'}></button>
				<nav class={`absolute left-0 right-0 bg-black${show ? '' : ' dn'}`}>
					<ul class="list pa0 ma0">
						<li><Link activeClassName={style.active + ' db'} href="/">Kart</Link></li>
						<li><Link activeClassName={style.active + ' db'} href="/trip">Tur</Link></li>
					</ul>
				</nav>
			</header>
		);
	}
}
