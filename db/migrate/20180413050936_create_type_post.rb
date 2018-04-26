class CreateTypePost < ActiveRecord::Migration[5.1]
  def change
    create_table :type_posts do |t|
      t.uuid :post_id
      t.uuid :type_id

      t.timestamps
    end
  end
end
