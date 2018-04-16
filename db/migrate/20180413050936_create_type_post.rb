class CreateTypePost < ActiveRecord::Migration[5.1]
  def change
    create_table :type_posts do |t|
      t.integer :post_id
      t.integer :type_id

      t.timestamps
    end
  end
end
