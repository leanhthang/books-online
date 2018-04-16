class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.string  :user_id
      t.integer :model_id
      t.string  :action
      t.string  :description
      t.timestamps
    end
  end
end
