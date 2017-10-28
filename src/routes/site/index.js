import { h, Component } from 'preact';
import style from './style';
import model from '../../components/model';
import { route } from 'preact-router';

const dates = [
    [ '', '', '', 1, 2, 3, 4],
    [ 5, 6, 7, 8, 9, 10, 11],
    [ 12, 13, 14, 15, 16, 17, 18],
    [ 19, 20, 21, 22, 23, 24, 25],
    [ 26, 27, 28, 29, 30, 31, '']
];

function weather(type, date) {
    return (
        <div class="tc flex-grow-1">
            <div>{type}</div>
            <p class="ma0">{date}</p>
        </div>
    );
}

export default class Site extends Component {
    constructor() {
        super();

        this.state = {
            sites: model.getSites(),
            number: undefined
        };

        this.dateClick = this.dateClick.bind(this);
        this.doneClick = this.doneClick.bind(this);
    }

    dateClick(evt) {
        const target = evt.target;

        if (target.nodeName.toLowerCase() === 'button') {
            this.setState({
                number: target.innerHTML
            });
        }
    }

    doneClick() {
        const {number, sites} = this.state;
        const site = sites.find(s => this.props.navn === s.navn);

        site.date = number + '.06.2017';

        model.addTrip(site);

        route('/trip', true);
    }

    getRating(rating) {
        return (
            <div class="flex mb4">
                <h2 class="ma0 f5">Rating</h2>
                <div class={style.ratingWrapper + ' relative'}>
                    <img src="../../gfx/stars-pink.svg" alt=""/>
                </div>
            </div>
        );
    }

    render({navn}, {sites, number}) {
        const site = sites.find(s => navn === s.navn);

        return (
            <div class={style.home}>
                {site.imgs ? <img src={site.imgs[0]} class="w-100"/> : ''}
                <div class={style.wrapper}>
    				<h1 class={style.tentTitle + ' ma0 mb2 pt3'}>{site.navn}</h1>
                    <p class="ma0 mb4">{site.coordinates}</p>
                    {site.rating ? this.getRating(site.rating) : ''}
                    <div class="flex mb3">
                        {weather('Regn', '18.06.2017')}
                        {weather('Sky', '19.06.2017')}
                        {weather('Sol', '20.06.2017')}
                    </div>
                    <div>
                        <div class="flex mb2">
                            <button class="ba bg-transparent b--black br2">t</button>
                            <div class="flex-grow-1 tc">Juli 2017</div>
                            <button class="ba bg-transparent b--black br2">f</button>
                        </div>
                        <table class="w-100 mb3">
                            <thead>
                                <tr>
                                    <th class="tc bb">Ma</th>
                                    <th class="tc bb">Ti</th>
                                    <th class="tc bb">On</th>
                                    <th class="tc bb">To</th>
                                    <th class="tc bb">Fr</th>
                                    <th class="tc bb">Lø</th>
                                    <th class="tc bb">Sø</th>
                                </tr>
                            </thead>
                            <tbody onclick={this.dateClick}>
                                {dates.map((d) => {
                                    return (<tr>
                                            {d.map(t => {
                                                return <td>
                                                    {t ? <button class={`tc ma0 pa0 w-100 h-100 bn br-pill ${number==t ? 'bg-dark-blue white' : 'bg-transparent'}`}>{t}</button> : ''}
                                                </td>
                                            })}
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <button onclick={this.doneClick} class="button-reset bn f4 w-100 dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">Legg til i min tur</button>
                </div>
            </div>
        );
    }
}
