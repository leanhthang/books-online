class CreateUserReports < ActiveRecord::Migration[5.1]
  def change
    create_table :user_reports do |t|
      t.integer :post_id, limit: 2
      t.integer :chapter_id, limit: 2
      t.integer :user_id
      t.text :description
      t.string :type

      t.timestamps
    end
  end
end
