import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  otherFoods: computed.setDiff('model.foods', 'model.restaurant.foods'),

  actions: {
    save() {
      this.model.restaurant.save();
      this.transitionToRoute('restaurants.restaurant', this.model.restaurant.id);
    },

    removeFood(food) {
      let restaurant = this.model.restaurant;

      restaurant.get('foods').removeObject(food);

      food.save().then(() => {
        restaurant.save()
      });
    },

    addFood(food) {
      let restaurant = this.model.restaurant;

      restaurant.get('foods').addObject(food);

      food.save().then(() => {
        restaurant.save()
      });
    }
  }
});
