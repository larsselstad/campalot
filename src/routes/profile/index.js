import { h, Component } from 'preact';
import style from './style';
import model from '../../components/model';
import { route } from 'preact-router';

export default class Profile extends Component {
	constructor() {
        super();

        this.state = {
            imgs: [],
			sites: model.getSites()
        };

        this.imgPicker = this.imgPicker.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.campSubmit = this.campSubmit.bind(this);
    }

    imgPicker() {
        this.fileInput.click();
    }

    fileChange(evt) {
        var index = 0;
        var numberOfImg = this.fileInput.files.length;
        var imgs = [];

        readNext(this);

        function readNext(context) {
            var file = context.fileInput.files[index++];
            var fr = new FileReader();

            fr.onload = function() {
                imgs.push(fr.result);

                if (index < numberOfImg) {
                    readNext(context);
                } else if (index === numberOfImg) {
                    context.setState({
                        imgs
                    });
                }
            }

            fr.readAsDataURL(file);
        }
    }


    campSubmit(evt) {
        evt.preventDefault();

		const site = this.state.sites.find(s => this.props.navn === s.navn);

		var newSite = Object.assign({}, site);

		newSite.navn = this.navnInput.value;
		newSite.imgs = this.state.imgs;
		newSite.rating = 4;

        model.changeSite(site, newSite);

		route('/', true);
    }

    render({navn}, {imgs, sites}) {
		const site = sites.find(s => navn === s.navn);

        return (
            <div class={style.profile}>
                <h1>Legg inn sted</h1>
                <p>Gi den teltplass ett navn og last opp bilder</p>

                <form action="." novalidation onsubmit={this.campSubmit}>
                    <div class="mb3">
                        <label htmlFor="navn" class="db mb2">Navn</label>
                        <input id="navn" name="navn" type="text" class="input-reset pa2 ba w-100" ref={(input) => { this.navnInput = input; }}/>
                    </div>

                    <div class="mb3">
                        <input onchange={this.fileChange} id="imgPicker" type="file" class="dn" ref={(input) => { this.fileInput = input; }} multiple/>

                        {imgs.length > 0 ? imgs.map(img => (<img src={img} class="w-50"/>)) :
                            (<button onclick={this.imgPicker} class="dim br-pill ph4 pv2 mb2 dib white bg-dark-blue ba f6" type="button">Velg bilder</button>)
                        }
                    </div>

                    <button class="dim br-pill ph4 pv2 mb2 dib white bg-dark-green ba f4" type="submit">Send inn</button>
                </form>
            </div>
        );
    }
}
