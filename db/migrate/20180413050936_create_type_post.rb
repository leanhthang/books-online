class CreateTypePost < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :type_posts, id: :uuid do |t|
      t.integer :post_id
      t.integer :type_id

      t.timestamps
    end
  end
end
