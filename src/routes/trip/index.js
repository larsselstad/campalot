import { h, Component } from 'preact';
import style from './style';
import model from '../../components/model';
import { route } from 'preact-router';

function weather(type, date) {
    return (
        <div class="tc flex-grow-1">
            <div>{type}</div>
            <p class="ma0">{date}</p>
        </div>
    );
}

export default class Trip extends Component {
    constructor() {
        super();

        this.state = {
            trips: model.getTrips()
        };

        this.addClick = this.addClick.bind(this);
    }

    addClick() {
        route('/');
    }

    render({}, {trips}) {
        return (
            <div class={style.home}>
                <h1 class="ma0 pa0 pv3">Min tur</h1>
                <ul class="list pa0 ma0">
                    {trips.map(t => {
                        return (<li class="relative mb3">
                            <a href={`/profile/${t.navn}`} class="relative db">
                                <p class="ma0">{t.date}</p>
                                <p class="ma0">{t.navn}</p>
                                <p class="ma0">{t.coordinates}</p>
                                <div class="absolute top-0 right-0">Sol</div>
                            </a>
                        </li>)
                    })}
                </ul>
                <button onclick={this.addClick} class="button-reset bn f4 w-100 dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">Legg til</button>
            </div>
        );
    }
}
