/**
 * STEPS:
 * 1. create a requestController class and define the needed variables for the API call
 * 2. Create a method that will get the current (last added) comic and set the currentComicsNumber and
 *    maxComicsNumber accordingly, call that method on load
 * 3. Register an event for the random comic number and add all the chain of event to display it
 * 4. Add Previous/Next, First/Last and get Comic by ID functionality to the app
 * 5. Adjust UI states accordingly
 */

class RequestController {
    constructor() {
        this.latestComicId = null;
        this.currentComicId = null;
        this.loader = document.querySelector('#loader');
        this.comicTitle = document.querySelector('#comic-title');
        this.comicImage = document.querySelector('#comic-image');
        this.comicDate = document.querySelector('#comic-date');
    }

    display(comic) {
        this.comicTitle.textContent = comic.title;
        this.comicImage.src = comic.img;
        const formatedDate = new Date(comic.year, comic.month - 1, comic.day).toDateString();
        this.comicDate.textContent = formatedDate;
    }

    async request(path) {
        this.loader.classList.remove('d-none');
        this.loader.classList.add('d-flex');
        const comic = await fetch(`http://localhost:3000${path}`).then(res => res.json());
        this.loader.classList.add('d-none');
        this.loader.classList.remove('d-flex');
        return comic;
    }

    async getLatest() {
        const comic = await this.request('/info.0.json');
        this.display(comic);
        if (!this.latestComicId) {
            this.latestComicId = comic.num;
        }
        if (!this.currentComicId) {
            this.currentComicId = comic.num;
        }
    }

    isLatest() {
        return this.currentComicId === this.latestComicId;
    }
    isFirst() {
        return this.currentComicId === 0;
    }

    async next() {
        if (this.isLatest()) return;

        this.currentComicId++;

        const comic = await this.request(`/${this.currentComicId}/info.0.json`);
        this.display(comic);
    }

    async prev() {
        if (this.isLatest()) return;

        this.currentComicId--;

        const comic = await this.request(`/${this.currentComicId}/info.0.json`);
        this.display(comic);
    }
}
const rc = new RequestController();
rc.getLatest();

function prev() {
    rc.prev();
}

function next() {
    rc.next();
}
function random() {
    rc.random();
}
