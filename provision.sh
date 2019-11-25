apt-get update

apt-get install -y git

sudo timedatectl set-timezone America/New_York

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install -y build-essential nodejs

cd /var/www/client

npm i -g @angular/cli
npm i

cd /var/www/server
npm i
