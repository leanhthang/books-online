class CreateUserReports < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :user_reports, id: :uuid do |t|
      t.uuid :post_id
      t.uuid :chapter_id
      t.uuid :user_id
      t.text :description
      t.string :type

      t.timestamps
    end
  end
end
