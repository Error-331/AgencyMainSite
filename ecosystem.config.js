module.exports = {
  apps: [
      {
          name: 'agency_main_site',
          script: './src_server/server.js',
          env: {
          },

          error_file: './logs/pm2_error.log',
          out_file: './logs/pm2_out.log'
      }
  ]
};
