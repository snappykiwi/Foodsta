import {
  trigger, group,
  transition, animate, style, query, state
} from '@angular/animations';


export const fadeCollapse =
  trigger('fadeInCollapse', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }),
      animate('.4s', style({ opacity: '1', transform: 'translateY(0px)', height: '*' })),
    ]),
    transition(':leave', [
      animate('.4s', style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }))
    ])
  ])

export const fadeIn =
  trigger('fadeIn', [
    state('notLoaded', style({
      opacity: 0,
      transform: 'translateY(30px)'
    })),
    state('loaded', style({
      opacity: 1,
      transform: 'translateY(0px)'
    })),
    transition('* => loaded', [
      animate('.8s ease-in-out')
    ])
  ]);

export const horizontalSlideAnimation =
  trigger('routeAnimations', [
    transition('ProfilePage => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: .8 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(50%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('HomePage => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(-50%)', opacity: .8 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('AddPage => ProfilePage', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(-50%)', opacity: .8 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('AddPage => HomePage', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: .8 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(50%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('RestaurantPage <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: .8 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
  ]);

export const verticalSlideAnimation =
  trigger('routeDesktopAnimations', [
    transition('ProfilePage => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translate(-43%, -100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translate(-43%, 0%)', opacity: .5 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('HomePage => *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translate(-43%, 100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translate(-43%, 0%)', opacity: .5 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, -100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('AddPage => ProfilePage', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translate(-43%, 100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translate(-43%, 0%)', opacity: .5 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, -100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('AddPage => HomePage', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translate(-43%, -100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translate(-43%, 0%)', opacity: .5 }),
          animate('0.6s ease-in-out', style({ transform: 'translate(-43%, 100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('RestaurantPage <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%', overflow: 'hidden' }), { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', opacity: .5 }),
          animate('0.6s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
  ]);


