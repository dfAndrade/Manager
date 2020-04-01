export class PopupTaskEditor {

    constructor(parent) {
        this.parent = parent;

        this.params = params;
        this.src = src;

        this.wrapper = null;
        this.content = null;

        this.init();
    }

    init() {
        this.wrapper = $("<div></div>");
    }

    loadForm() {
        let self = this;
        $.get(this.src, function (data, status) {
            self.content = $(data);
            self.parent.append($(data));
        });
    }

    show() {
        if (!this.content) this.loadform();


    }
}