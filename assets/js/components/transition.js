/*
 * Script for page transitions
 * without page reloads
 */
(function() {

    function delay(milliseconds) {

        return new Promise(done => { 

            setTimeout(() => { 

                done() 

            }, milliseconds); 

        });

    }


    barba.init({
        
        views: [

        {

            namespace: 'new',

            afterEnter() {

                newPageScript();

            }

        },

        {

            namespace: 'match',

            afterEnter() {

                matchPageScript();

            }

        },

        {

            namespace: 'results',
            
            afterEnter() {

                resultsPageScript();

            }
        }

        ],

        transitions: [{

            name: 'default-transition',

            async leave(data) {

                const done = this.async();

                gsap.to(data.current.container, { opacity: 0 });

                await delay(1000);

                gsap.to('.loading', { right: '0vw' });          

                await delay(2500); 

                done();

            },

            async enter(data) {
                
                const done = this.async();

                gsap.to('.loading', { right: '100vw' });

                await delay(1000);

                gsap.from(data.next.container, { opacity: 0 });

                done();

            }

        }]

    });

})();
