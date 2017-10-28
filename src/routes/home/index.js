import { h, Component } from 'preact';
import style from './style';
import model from '../../components/model';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            sites: model.getSites()
        };

        this.mapClick = this.mapClick.bind(this);
    }

    mapClick(evt) {
        const {target, offsetX, offsetY} = evt;

        if (target.nodeName.toLowerCase() !== 'a') {
            const newSite = {
                coor: {
                    x: offsetX - 39,
                    y: offsetY - 27
                },
                coordinates: '60N 105Ø',
                navn: 'Musefoss'
            };

            model.addSite(newSite);

            this.setState({
                sites: model.getSites()
            });
        }
    }

    render({}, {sites}) {
        return (
            <div class={style.home} onclick={this.mapClick}>
				{sites.map((s) => {
					return (<a href={`/site/${s.navn}`} class={style.site + ' link' + (s.rating ? '' : ' ' + style.new)} style={`top:${s.coor.y}px;left:${s.coor.x}px;`}>{s.navn}</a>);
				})}
            </div>
        );
    }
}
