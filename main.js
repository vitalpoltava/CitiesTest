;(function($, undefined) {
    var mockList = [{name: "Moscow", count: 12, content: "<p>Moscow is the capital city and the most populous federal subject of <b>Russia</b>. The city is a major political, economic, cultural and scientific center in Russia and in Eurasia.</p>"},
        {name: "Amsterdam", count: 25, content: "<p>Amsterdam is the capital and most populous city of the <b>Netherlands</b>. Its status as the Dutch capital is mandated by the Constitution of the Netherlands though it is not the seat of the Dutch government, which is at the Hague. </p>"},
        {name: "Lisbon", count: 15, content: "<p>Lisbon is the largest cityand capital of <b>Portugal</b> with a population of 547,631 within its administrative limits on a land area of 84.8 square kilometers.</p>"}, {name: "Berlin", count: 19, content: "<p>Berlin is the capital city of <b>Germany</b> and one of the 16 states of Germany. With a population of 3.3 million people, Berlin is Germany's largest city and is the second most populous city proper and the seventh most populous urban area in the European Union.</p>"},
        {name: "Madrid", count: 25, content: "<p>Madrid is the capital of <b>Spain</b> and its largest city. The population of the city is roughly 3.3 million and the entire population of the Madrid metropolitan area is calculated to be around 6.5 million.</p>"},
        {name: "Barcelona", count: 10, content: "<p>Barcelona is a Spanish city, capital of the autonomous community of Catalonia and the second largest city in the country, with a population of 1,620,943 within its administrative limits.</p>"},
        {name: "Zagreb", count: 27, content: "<p>Zagreb is the capital and the largest city of the Republic of <b>Croatia</b>. It is located in the northwest of the country, along the Sava river, at the southern slopes of the Medvednica mountain.</p>"},
        {name: "Singapore", count: 30, content: "<p>Singapore, officially the Republic of Singapore, is a Southeast Asian sovereign city-state off the southern tip of the Malay Peninsula, 137 kilometers north of the equator.</p>"},
        {name: "Beijing", count: 14, content: "<p>Beijing, sometimes romanized as Peking, is the capital of the People's Republic of China and one of the most populous cities in the world. The population as of 2012 was 20,693,000.</p>"},
        {name: "Paris", count: 5, content: "<p>Paris is the capital and most populous city of <b>France</b>. It is situated on the River Seine, in the north of the country, at the heart of the Île- de-France region.</p>"}];

    // main functionality (taking into account using old browsers)
    var list = {

        // configs
        list: [],
        columns: 3,
        elSelector: '.columns',
        infoSelector: '.more_info',
        $info: null,
        $el: null,
        $cols: [],
        $cities: [],
        timer: null,

        // main functionality
        init: function() {
            this.$el = $(this.elSelector);
            this.$info = $(this.infoSelector);
            this.getSortedList(mockList)
                .renderColumns()
                .renderList()
                .addEvents();
        },

        getSortedList: function(list) {
            this.list = list.sort(function(a, b) {
                return a.name > b.name ? 1 : -1;
            });
            return this;
        },

        renderColumns: function() {
            var colW = Math.floor(100/this.columns);
            for(var i = 0; i < this.columns; i += 1) {
                this.$el.append('<div class="col col'+ i +'" style="width:'+ colW +'%"></div>');
                this.$cols.push($('.col' + i)); // populate list of columns
            }
            return this;
        },

        renderList: function() {
            var $city;
            var template = '';
            var col = 0;
            var len = this.list.length;
            var max = Math.floor((len-1)/(this.columns-1));

            // distribute records by columns
            if (!len) return this;
            for(var i = 0; i < len; i += 1) {
                template = '<div class="city city'+ i +'"><a href="javascript:void(0)">'+ this.list[i].name +'</a>&nbsp;('+ this.list[i].count +')</div>';
                if (this.$cols[col]) {
                    this.$cols[col].append(template);
                    $city = $('.city' + i + ' a');
                    $city.data('info', this.list[i].content); // add city info to elem store
                    this.$cities.push($city); // populate list of cities elements
                }
                if ((i+1)%max === 0) {
                    col += 1;
                }
            }
            return this;
        },

        addEvents: function() {
            var len = this.$cities.length;
            if (!len) return this;

            for(var i = 0; i < len; i += 1) {
                this.$cities[i].click($.proxy(this._showCityDetails, this));
            }
        },

        _showCityDetails: function(e) {
            var self = this;
            var $city = $(e.target || e.srcElement);
            var data = $city.data('info');

            this.$info.html(data);
            this.$info.toggleClass('flash');
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                self.$info.toggleClass('flash');
            }, 400);
        }
    };

    // init application
    list.init();

}(jQuery, undefined));