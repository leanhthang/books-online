class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def update_visited(obj)
    obj.visited += 1
    obj.save
  end

  def update_rating(obj)
    obj.rating += 1
    obj.save
  end

  def update_like(obj)
    obj.like += 1
    obj.save
  end
end
