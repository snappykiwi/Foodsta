import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const fadeIn = animation([
  trigger('fadeInCollapse', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('.5s', style({ opacity: 1, transform: 'translateY(0px)' })),
    ]),
    transition(':leave', [
      animate('.5s', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ])
  ]),
]);

export const fadeCollapse = animation([
  trigger('fadeInCollapse', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }),
      animate('.4s', style({ opacity: '1', transform: 'translateY(0px)', height: '*' })),
    ]),
    transition(':leave', [
      animate('.4s', style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }))
    ])
  ])
])
