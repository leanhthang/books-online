class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.uuid  :user_id
      t.uuid  :model_id
      t.string  :action
      t.string  :description
      t.timestamps
    end
  end
end
