const mongoose = require('mongoose')

module.exports = async () => {
  console.log('📌 Creating indexes...')
  const db = mongoose.connection.db

  // Users indexes
  await db.collection('users').createIndexes([
    { key: { phone: 1 },            unique: true, name: 'idx_users_phone'           },
    { key: { invitation_code: 1 },  unique: true, name: 'idx_users_invitation_code' },
    { key: { referred_by_code: 1 },              name: 'idx_users_referred_by_code' },
    { key: { vip_level: 1 },                     name: 'idx_users_vip_level'        },
    { key: { createdAt: -1 },                    name: 'idx_users_created_at'       },
  ])

  // Transactions indexes
  await db.collection('transactions').createIndexes([
    { key: { user_id: 1 },              name: 'idx_transactions_user_id'    },
    { key: { type: 1 },                 name: 'idx_transactions_type'       },
    { key: { status: 1 },               name: 'idx_transactions_status'     },
    { key: { createdAt: -1 },           name: 'idx_transactions_created_at' },
    { key: { user_id: 1, type: 1 },     name: 'idx_transactions_user_type'  },
  ])

  // Orders indexes
  await db.collection('orders').createIndexes([
    { key: { user_id: 1 },          name: 'idx_orders_user_id'    },
    { key: { status: 1 },           name: 'idx_orders_status'     },
    { key: { type: 1 },             name: 'idx_orders_type'       },
    { key: { createdAt: -1 },       name: 'idx_orders_created_at' },
    { key: { user_id: 1, status: 1},name: 'idx_orders_user_status'},
  ])

  // Team indexes
  await db.collection('teams').createIndexes([
    { key: { referrer_id: 1 },         name: 'idx_team_referrer_id'      },
    { key: { user_id: 1 },             name: 'idx_team_user_id'          },
    { key: { level: 1 },               name: 'idx_team_level'            },
    { key: { referrer_id: 1, level: 1},name: 'idx_team_referrer_level'   },
    { key: { is_valid: 1 },            name: 'idx_team_is_valid'         },
  ])

  // Commissions indexes
  await db.collection('commissions').createIndexes([
    { key: { earner_id: 1 },       name: 'idx_commissions_earner_id' },
    { key: { from_user_id: 1 },    name: 'idx_commissions_from_user' },
    { key: { order_id: 1 },        name: 'idx_commissions_order_id'  },
    { key: { level: 1 },           name: 'idx_commissions_level'     },
    { key: { createdAt: -1 },      name: 'idx_commissions_created'   },
  ])

  // DailySignIn indexes
  await db.collection('dailysignins').createIndexes([
    { key: { user_id: 1 },             name: 'idx_signin_user_id'   },
    { key: { signed_at: -1 },          name: 'idx_signin_signed_at' },
    { key: { user_id: 1, signed_at: -1}, name: 'idx_signin_user_date'},
  ])

  // BankCards indexes
  await db.collection('bankcards').createIndexes([
    { key: { user_id: 1 },   name: 'idx_bankcards_user_id'  },
    { key: { is_active: 1 }, name: 'idx_bankcards_is_active'},
  ])

  console.log('✅ Indexes created')
}