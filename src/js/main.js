document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const footer = document.querySelectorAll('footer');
    const header = document.querySelector('header');
    const footerSection = document.querySelector('#contacto');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Ajusta este valor según sea necesario para la detección de la sección
    };

    // Función para verificar si dos elementos se superponen
    function checkElementsOverlap(element1Rect, element2Rect) {
        return element1Rect.bottom > element2Rect.top && element1Rect.top < element2Rect.bottom;
    }

    // Función para detectar si la navegación está sobre el footer y aplicar efecto gradual
    function checkNavOverFooter() {
        if (!header || !footerSection) return;
        
        const headerRect = header.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        
        // Verificar si el header se superpone con el footer
        const isOverFooter = checkElementsOverlap(headerRect, footerRect);
        
        if (isOverFooter) {
            // Calcular el porcentaje de superposición para el efecto gradual
            const overlapStart = Math.max(headerRect.top, footerRect.top);
            const overlapEnd = Math.min(headerRect.bottom, footerRect.bottom);
            const overlapHeight = overlapEnd - overlapStart;
            const headerHeight = headerRect.height;
            const overlapPercentage = Math.min(100, Math.max(0, (overlapHeight / headerHeight) * 100));
            
            header.classList.add('over-footer');
            header.style.setProperty('--overlap-percentage', `${overlapPercentage}%`);
        } else {
            header.classList.remove('over-footer');
            header.style.removeProperty('--overlap-percentage');
        }
    }

    // Ejecutar la función en scroll
    window.addEventListener('scroll', checkNavOverFooter);
    // Ejecutar al cargar la página
    checkNavOverFooter();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                });

                // Si la sección 'hero' está intersectando o si el scroll está en la parte superior de la página
                if (currentSectionId === 'hero' || window.scrollY === 0) {
                    document.querySelector('a[href="#sobre-mi"]').parentElement.classList.add('active');
                } else {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href').substring(1) === currentSectionId) {
                            link.parentElement.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    [...sections, ...footer].forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = link.getAttribute('href');
            let targetElement;
            if (targetHref === '#faqs') {
                targetElement = document.querySelector('.faqs');
            } else {
                targetElement = document.querySelector(targetHref);
            }

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal de Equipamiento
    const openEquipamientoModalBtn = document.getElementById('open-equipamiento-modal');
    const equipamientoModal = document.getElementById('equipamiento-modal');
    const equipamientoModalCloseBtn = equipamientoModal.querySelector('.modal-close-button');

    openEquipamientoModalBtn.addEventListener('click', () => {
        equipamientoModal.classList.add('show');
        document.body.classList.add('no-scroll');
    });

    equipamientoModalCloseBtn.addEventListener('click', () => {
        equipamientoModal.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    equipamientoModal.addEventListener('click', (e) => {
        if (e.target === equipamientoModal) {
            equipamientoModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });

    // Modal de Baterías
    const bateriasModal = document.getElementById('baterias-modal');
    const bateriasModalCloseBtn = bateriasModal.querySelector('.modal-close-button');
    const bateriaModalContent = document.getElementById('bateria-modal-content');
    const bateriaItems = document.querySelectorAll('.bateria-item');

    const bateriasData = {
        'mapex-orion': {
            description: 'Bombo 24x18 - Tom 10x8 - Tom 13x9 - FloorTom 15x15 - FloorTom 18x16',
            images: [
                'assets/Mapex Orion Series/cover.jpg',
                'assets/Mapex Orion Series/mapex01.jpg',
                'assets/Mapex Orion Series/mapex02.jpg',
                'assets/Mapex Orion Series/mapex03.jpg'
            ]
        },
        'ludwig-90th': {
            description: 'Bombo 22x14 - Tom 13x9 - FloorTom 16x16',
            images: [
                'assets/Ludwig 90th Anniversary/cover.jpg',
                'assets/Ludwig 90th Anniversary/lud-90-2.jpg',
                'assets/Ludwig 90th Anniversary/lud-90-3.jpg'
            ]
        },
        'ludwig-super-classic': {
            description: 'Bombo 22x14 - Tom 12x8 - Tom 13x9 - FloorTom 14x14 - FloorTom 16x16',
            images: [
                'assets/Ludwig Super Classic 1965/cover.jpg',
                'assets/Ludwig Super Classic 1965/lud-65-3.jpg',
                'assets/Ludwig Super Classic 1965/lud-65-4.jpg',
                'assets/Ludwig Super Classic 1965/lud-65-5.jpg'
            ]
        },
        'sonor-prolite': {
            description: 'Bombo 20x17,5 - Tom 8x7 - Tom 10x8 - Tom 12x9 - FloorTom 14x14 - FloorTom 16x16',
            images: [
                'assets/Sonor Prolite Series/cover.jpg',
                'assets/Sonor Prolite Series/sonor-1b.jpg',
                'assets/Sonor Prolite Series/sonor-3.png'
            ]
        },
        'dw-collectors': {
            description: 'Bombo 22x18 - Tom 10x8 - Tom 12x9 - FloorTom 14x12 - FloorTom 16x14',
            images: [
                'assets/DW Collectors Series/cover.jpg',
                'assets/DW Collectors Series/dw-1.jpg',
                'assets/DW Collectors Series/dw-3.jpg',
                'assets/DW Collectors Series/dw-4.jpg'
            ]
        },
        'otros': {
            description: 'Bombo Ludwig Super Classic Maple (80´s) 26x14',
            images: [
                'assets/Otros/cover.jpg',
                'assets/Otros/lud-26-2.jpg'
            ]
        },
        'snares': {
            title: 'Snares',
            description: [
                'Mapex Orion Series 14x5,5',
                'Blanck Panther Premium 14x6,5',
                'Black Panther Premium 12x6',
                'Brady Jarra 14x6,5',
                'Dw Collector 14x5,5',
                'Dw Collector Maple/Mahogany 14x7',
                'GMS Maple 14x8',
                'Ludwig 1920 14x5 (madera)',
                'Ludwig Supraphonic 1966 14x5',
                'Ludwig Supraphonic 1964 14x6,5',
                'Ludwig Acrolite 1966 14x5',
                'Ludwig 90 aniversary 14x6,5',
                'Ludwig Black Beauty Hammered 14x6,5',
                'Noble & Cooley 150 Anniversary 13x5,5',
                'Pearl Reference 14x6,5',
                'Pearl Free Floating (Brass) 14x4',
                'Rogers Dynasonic 70’s 14x5',
                'Slingerland Radio King 1968 14x5',
                'Tama SLP (Aro Madera) 14x6,5',
                'Tama SLP Maple 13x7',
                'Tama Bell Brass 14x6,5',
                'Ocho Catorce maple 10x6',
                'Ocho Catorce madera 14x6',
                'Ocho Catorce Steel 14x6,5',
                'Yamaha Nouveau Brass 14x7'
            ],
            images: [
                'assets/snares/cover.jpg',
                'assets/snares/redoblantes02.jpg'
            ]
        },
        'platillos': {
            title: 'Platillos',
            description: [
                {
                    titulo: 'Crashes',
                    descripcion: [
                        'Zildjian K Dark Thin 16”',
                        'Zildjian K Dark Thin 18”',
                        'Zildjian K Dark Medium 18”',
                        'Zildjian K Sweet 19”',
                        'Zildjian K Hybrid 19”',
                        'Zildjian K Constantinople 18”',
                        'Zildjian Z Custom Medium 17”',
                        'Zildjian Avedis Medium 17”',
                        'Istambul Art 16”',
                        'Paiste 2002 Power 18”',
                        'Paiste 2002 19”',
                        'Sabian Artisan 19”',
                        'Sabian Artisan Medium 20”',
                        'Meinl Jazz Medium 20”',
                        'Soultone Gospel 17”',
                        'Soultone Custom Brilliant 16”',
                        'Soultone Custom 19”',
                        'Soultone Gospel 20”'
                    ]
                },
                {
                    titulo: 'Rides',
                    descripcion: [
                        'Zildjian Z Custom Power 20”',
                        'Zildjian Avedis Sweet 21”',
                        'Sabian AAX Omni 22”',
                        'Sabian Artisan Raw Bell 22”',
                        'Istambul Agop Traditional Heavy 22”',
                        'Soultone Vintage 24”',
                        'Zildjian K Constantinople Medium Thin Low 22”'
                    ]
                },
                {
                    titulo: 'Splashes',
                    descripcion: [
                        'Zildjian Avedis 6”',
                        'Zildjian K 8”',
                        'Paiste Signature 8”',
                        'Paiste 2002 10”'
                    ]
                },
                {
                    titulo: 'Hi Hats',
                    descripcion: [
                        'Zildjian Special Recording 12”',
                        'Zildjian Hybrid 13,25”',
                        'Zildjian Avedis 80´s 14”',
                        'Zildjian Avedis Master Sound 14”',
                        'Zildjian K Constantinople 14”',
                        'Zildjian K Light 15”',
                        'Paiste 2002 Sound Edge 14”',
                        'Meinl Byzance Extra Dry 14”',
                        'Soultone Extreme 15”',
                        'Soultone Vintage 15”',
                        'Sabian Artisan 15”'
                    ]
                },
                {
                    titulo: 'Efectos',
                    descripcion: [
                        'Zildjian Oriental Trash China 16”',
                        'Zildjian Oriental Trash China 18”',
                        'Zildjian A Custom Fx 20”',
                        'Zildjian Crash Of Doom 20”',
                        'Soultone China FXO 20”',
                        'Sabian Chopper 10”',
                        'Zildjian Zil Bel 6”'
                    ]
                }
            ],
            images: [
                'assets/platillos/plates02.jpg',
                'assets/platillos/plates03.jpg'
            ]
        },
        'percusion': {
            title: 'Percusión',
            description: [
                'Timbales LP Tito Puente Acero 14”/15”',
                'Bongos LP Santana',
                'Udu',
                'Pandereta para Hi hat Rhythm Tech Hat Trick G2',
                'Pandereta de mano Rhythm Tech',
                'Pandereta de mano LP',
                'Pandereta de mano MEINL',
                'Cencerro LP Rock Ridge Rider',
                'Cencerro LP Salsa Uptown Timbale',
                'Cencerro LP Salsa Cha Cha Cowbel',
                'JamBlock Red',
                'Crasher Roasso',
                'Rototoms Slingerland 6”; 8”; 10”',
                'Roland SPD SX'
            ],
            images: [
                'assets/percusion/cover.jpg',
                'assets/percusion/percu02.jpg'
            ]
        }
    };

    function loadBateriaContent(bateriaId) {
        const data = bateriasData[bateriaId];
        if (data) {
            // Obtener el título directamente del elemento <h3> del item clickeado
            const clickedItem = document.querySelector(`.bateria-item[data-bateria="${bateriaId}"]`);
            const titleElement = clickedItem ? clickedItem.querySelector('h3') : null;
            const displayTitle = titleElement ? titleElement.textContent : data.title; // Fallback

            let descriptionHtml = '';
            let isArrayDescription = false;

            if (Array.isArray(data.description)) {
                isArrayDescription = true;
                // Check if the first item in the description array has a 'titulo' property
                descriptionHtml = '<div class="section-description-array">';
                if (data.description.length > 0 && typeof data.description[0] === 'object' && data.description[0].hasOwnProperty('titulo')) {
                    // This is for 'platillos' with nested arrays and titles
                   
                    let column1Html = '';
                    let column2Html = '';
                    let column3Html = '';

                    data.description.forEach(category => {
                        let content = `<div><h4>${category.titulo}</h4>`;
                        if (Array.isArray(category.descripcion)) {
                            category.descripcion.forEach(item => {
                                content += `<p>${item}</p>`;
                            });
                        } else {
                            content += `<p>${category.descripcion}</p>`;
                        }
                        content += '</div>';
                        if (category.titulo === 'Crashes') {
                            column1Html += content;
                        } else if (category.titulo === 'Rides' || category.titulo === 'Efectos') {
                            column2Html += content;
                        } else if (category.titulo === 'Hi Hats' || category.titulo === 'Splashes') {
                            column3Html += content;
                        }
                    });

                    descriptionHtml += `<div class="column">${column1Html}</div>`;
                    descriptionHtml += `<div class="column">${column2Html}</div>`;
                    descriptionHtml += `<div class="column">${column3Html}</div>`;
                } else {
                    // This is for 'snares' and 'percusion' with simple lists
                    const itemsPerColumn = Math.ceil(data.description.length / 3);
                    let columnsHtml = Array.from({ length: 3 }, () => '');

                    data.description.forEach((item, index) => {
                        if (index < itemsPerColumn) {
                            columnsHtml[0] += `<p>${item}</p>`;
                        } else if (index < itemsPerColumn * 2) {
                            columnsHtml[1] += `<p>${item}</p>`;
                        } else {
                            columnsHtml[2] += `<p>${item}</p>`;
                        }
                    });

                    columnsHtml.forEach(colHtml => {
                        descriptionHtml += `<div class="">${colHtml}</div>`;
                    });
                }
                descriptionHtml += '</div>';
            } else {
                // This is for single string descriptions (e.g., 'mapex-orion')
                descriptionHtml = `<div class="section-description"><p>${data.description}</p></div>`;
            }

            let imagesHtml = '';
            if (data.images && Array.isArray(data.images)) {
                data.images.forEach(src => {
                    imagesHtml += `<img src="${src}" alt="${displayTitle}">`;
                });
            }

            bateriaModalContent.innerHTML = `
                <h2 class="section-title">${data.title || displayTitle}</h2>
                ${!isArrayDescription ? descriptionHtml : ''}
                <div class="bateria-images-container ${isArrayDescription ? 'is-array' : ''}">
                    ${isArrayDescription ? descriptionHtml : ''}
                    <div class="bateria-images">
                        ${imagesHtml}
                    </div>
                </div>
            `;
        } else {
            bateriaModalContent.innerHTML = `<p>Contenido no disponible para esta batería.</p>`;
        }
    }

    bateriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const bateriaId = item.dataset.bateria;
            loadBateriaContent(bateriaId);
            bateriasModal.classList.add('show');
            document.body.classList.add('no-scroll');
        });
    });

    bateriasModalCloseBtn.addEventListener('click', () => {
        bateriasModal.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    bateriasModal.addEventListener('click', (e) => {
        if (e.target === bateriasModal) {
            bateriasModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });

    // Carrusel de Reseñas con Glide.js
    const glide = new Glide('.glide', {
        type: 'carousel',
        perView: 1,
        gap: 26,
        focusAt: 'center',
        peek: {
            before: 20,
            after: 20
        },
        breakpoints: {
            4000: {
                perView: 5.2
            },
            1900: {
                perView: 4.6
            },
            1600: {
                perView: 4.1
            },
            1400: {
                perView: 3.5
            },
            1200: {
                perView: 3
            },
            992: {
                perView: 2.4
            },
            768: {
                perView: 2
            },
            480: {
                perView: 1
            }
        }
    });

    glide.mount();

    // Acordeón de Preguntas Frecuentes
    const faqQuestions = document.querySelectorAll('.accordion-header');

    // Asegurarse de que todos los acordeones estén cerrados al cargar la página
    faqQuestions.forEach(question => {
        const faqItem = question.closest('.accordion-item');
        const answer = faqItem.querySelector('.accordion-content');
        answer.classList.remove('show');
        question.classList.remove('active');
        answer.style.maxHeight = '0px';
    });

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.accordion-item');
            const answer = faqItem.querySelector('.accordion-content');

            // Cierra todas las demás respuestas abiertas
            faqQuestions.forEach(otherQuestion => {
                const otherFaqItem = otherQuestion.closest('.accordion-item');
                const otherAnswer = otherFaqItem.querySelector('.accordion-content');
                if (otherQuestion !== question && otherAnswer.classList.contains('show')) {
                    otherAnswer.classList.remove('show');
                    otherQuestion.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Alterna la respuesta actual
            question.classList.toggle('active');
            answer.classList.toggle('show');

            if (answer.classList.contains('show')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });


});